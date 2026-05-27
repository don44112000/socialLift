import express from "express";

const router = express.Router();
const GRAPH_VERSION = "v25.0";

async function exchangeForLongLivedUserToken(shortToken) {
  const appId = process.env.FB_APP_ID;
  const secret = process.env.FB_APP_SECRET;
  if (!appId || !secret) {
    throw new Error("Server missing FB_APP_ID or FB_APP_SECRET");
  }
  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/oauth/access_token` +
    `?grant_type=fb_exchange_token` +
    `&client_id=${encodeURIComponent(appId)}` +
    `&client_secret=${encodeURIComponent(secret)}` +
    `&fb_exchange_token=${encodeURIComponent(shortToken)}`;

  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok) {
    const msg = (body && body.error && body.error.message) || "exchange failed";
    throw new Error(msg);
  }
  return body;
}

router.post("/store-tokens", async (req, res) => {
  const payload = req.body || {};

  if (!payload.user || !payload.user.userAccessToken) {
    return res.status(400).json({ error: "missing user.userAccessToken" });
  }
  if (!Array.isArray(payload.pages)) {
    return res.status(400).json({ error: "pages must be an array" });
  }

  try {
    const longLived = await exchangeForLongLivedUserToken(
      payload.user.userAccessToken
    );

    // TODO: persist payload.user + payload.pages with the long-lived token.
    // Do NOT log tokens in production. Store encrypted (e.g. KMS, secrets manager,
    // or a DB column with application-level encryption). For now we just ack.
    const record = {
      userId: payload.user.id,
      userName: payload.user.name,
      longLivedUserTokenExpiresIn: longLived.expires_in || null,
      pageCount: payload.pages.length,
      igCount: payload.pages.filter((p) => p.instagramBusinessAccount).length,
      grantedAt: payload.grantedAt,
    };

    return res.status(200).json({
      ok: true,
      message: `Received ${record.pageCount} Page(s), ${record.igCount} IG account(s).`,
      record,
    });
  } catch (err) {
    console.error("Token exchange failed:", err.message);
    return res
      .status(502)
      .json({ error: "token exchange failed: " + err.message });
  }
});

export default router;
