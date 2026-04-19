// Netlify Function: receives the user + page access tokens from the frontend.
// Replace the TODO section with your actual persistence (DB, queue, KMS, etc.).
// Required env vars (set in Netlify UI → Site settings → Environment):
//   FB_APP_ID
//   FB_APP_SECRET        (used to exchange short-lived for long-lived tokens)
//   ALLOWED_ORIGIN       (e.g. https://your-site.netlify.app)

const GRAPH_VERSION = "v25.0";

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

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

exports.handler = async (event) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  const headers = corsHeaders(allowedOrigin);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "method not allowed" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (_) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "invalid json" }),
    };
  }

  if (!payload.user || !payload.user.userAccessToken) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "missing user.userAccessToken" }),
    };
  }
  if (!Array.isArray(payload.pages)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "pages must be an array" }),
    };
  }

  let longLived;
  try {
    longLived = await exchangeForLongLivedUserToken(
      payload.user.userAccessToken
    );
  } catch (err) {
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: "token exchange failed: " + err.message }),
    };
  }

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

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      ok: true,
      message: `Received ${record.pageCount} Page(s), ${record.igCount} IG account(s).`,
      record,
    }),
  };
};
