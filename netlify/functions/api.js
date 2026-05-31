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

export async function handler(event, context) {
  // Handle CORS Preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: "",
    };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Verify route matching /api/store-tokens (which rewrites to this function)
  if (!event.path.endsWith("/store-tokens")) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Not Found" }),
    };
  }

  try {
    const payload = JSON.parse(event.body || "{}");

    if (!payload.user || !payload.user.userAccessToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "missing user.userAccessToken" }),
      };
    }
    if (!Array.isArray(payload.pages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "pages must be an array" }),
      };
    }

    const longLived = await exchangeForLongLivedUserToken(
      payload.user.userAccessToken
    );

    // Prepare response record (Persistence TODO placeholder)
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
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({
        ok: true,
        message: `Received ${record.pageCount} Page(s), ${record.igCount} IG account(s).`,
        record,
      }),
    };
  } catch (err) {
    console.error("Token exchange failed:", err.message);
    return {
      statusCode: 502,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
      },
      body: JSON.stringify({ error: "token exchange failed: " + err.message }),
    };
  }
}
