(function () {
  "use strict";
  const cfg = window.WOUCHH_CONFIG || {};

  const el = {
    envBadge:    document.getElementById("env-badge"),
    fbLoginBtn:  document.getElementById("fb-login-btn"),
    fbLabel:     document.getElementById("fb-login-label"),
    ttLoginBtn:  document.getElementById("tt-login-btn"),
    ttLabel:     document.getElementById("tt-login-label"),
    errorBanner: document.getElementById("error-banner"),
  };

  function showError(msg) {
    if (!el.errorBanner) return alert(msg);
    el.errorBanner.hidden = false;
    el.errorBanner.textContent = msg;
  }

  /* ---------- Facebook login ---------- */
  function fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(
        (r) => r.authResponse ? resolve(r.authResponse) : reject(new Error("Login cancelled")),
        { scope: (cfg.FB_SCOPES || []).join(","), return_scopes: true, auth_type: "rerequest" }
      );
    });
  }
  function fbGet(path, params) {
    return new Promise((resolve, reject) => {
      FB.api(path, "GET", params || {}, (res) => {
        if (!res || res.error) reject(new Error((res && res.error && res.error.message) || "API error"));
        else resolve(res);
      });
    });
  }

  let connecting = false;

  async function onFbLogin() {
    connecting = true;
    el.fbLoginBtn.disabled = true;
    el.ttLoginBtn.disabled = true;
    el.fbLabel.textContent = "Connecting…";

    const hasFb = cfg.FB_APP_ID && !cfg.FB_APP_ID.startsWith("REPLACE_");
    if (hasFb && window.FB) {
      try {
        const auth = await fbLogin();
        const me = await fbGet("/me", { fields: "id,name,email,picture" });
        const accounts = await fbGet("/me/accounts", {
          fields: "id,name,category,access_token,instagram_business_account{id,username}",
        });
        const pages = (accounts.data || []).map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          access_token: p.access_token,
          instagram_business_account: p.instagram_business_account || null,
        }));
        FB.setSession({
          user: {
            id: me.id,
            name: me.name,
            email: me.email,
            picture: me.picture,
            userAccessToken: auth.accessToken,
          },
          pages,
          business: {
            name: pages[0] ? pages[0].name : me.name,
            shortName: pages[0] ? pages[0].name.split(" ")[0] : "Business",
            plan: "Connected",
            logo: FBData.BUSINESS.logo,
            location: "India",
          },
          manager: { name: me.name, role: "Admin", avatar: FBData.MANAGER.avatar },
          platforms: ["facebook", "instagram"],
          grantedAt: new Date().toISOString(),
          demo: false,
        });
        window.location.href = "/facebook/dashboard.html";
        return;
      } catch (err) {
        if (err.message !== "Login cancelled") showError(err.message || String(err));
        connecting = false;
        el.fbLabel.textContent = "Continue with Facebook";
        const termsCb = document.getElementById("accept-terms");
        const privacyCb = document.getElementById("accept-privacy");
        const accepted = termsCb.checked && privacyCb.checked;
        el.ttLoginBtn.disabled = !accepted;
        el.fbLoginBtn.disabled = !accepted;
        return;
      }
    }

    /* Demo mode — no Meta API */
    try {
      FB.setSession(FBData.createDemoSession());
      window.location.href = "/facebook/dashboard.html";
    } catch (err) {
      showError(err.message || String(err));
      connecting = false;
      el.fbLabel.textContent = "Continue with Facebook";
      const termsCb = document.getElementById("accept-terms");
      const privacyCb = document.getElementById("accept-privacy");
      const accepted = termsCb.checked && privacyCb.checked;
      el.ttLoginBtn.disabled = !accepted;
      el.fbLoginBtn.disabled = !accepted;
    }
  }

  /* ---------- TikTok login ---------- */
  async function onTtLogin() {
    connecting = true;
    el.ttLoginBtn.disabled = true;
    el.fbLoginBtn.disabled = true;
    /* In production this redirects to TikTok OAuth.
       For demo, simulate a successful login with demo data. */
    const clientKey = cfg.TIKTOK_CLIENT_KEY;
    if (clientKey && !clientKey.startsWith("REPLACE_")) {
      /* Real OAuth redirect */
      const scopes = (cfg.TIKTOK_SCOPES || []).join(",");
      const state = "sl_" + Date.now();
      const url = "https://www.tiktok.com/v2/auth/authorize/" +
        "?client_key=" + encodeURIComponent(clientKey) +
        "&scope=" + encodeURIComponent(scopes) +
        "&response_type=code" +
        "&redirect_uri=" + encodeURIComponent(cfg.TIKTOK_REDIRECT_URI) +
        "&state=" + encodeURIComponent(state);
      window.location.href = url;
      return;
    }

    /* Demo mode: simulate TikTok connection */
    el.ttLoginBtn.disabled = true;
    el.ttLabel.textContent = "Connecting…";
    try {
      const profile = await SLApi.tiktokProfile();
      const existing = SL.getSession() || {};
      SL.setSession({
        ...existing,
        tiktok: profile,
        tiktokScopes: cfg.TIKTOK_SCOPES || [],
        grantedAt: existing.grantedAt || new Date().toISOString(),
        platforms: [...new Set([...(existing.platforms || []), "tiktok"])],
      });
      window.location.href = "/dashboard.html";
    } catch (err) {
      showError(err.message || String(err));
      connecting = false;
      const termsCb = document.getElementById("accept-terms");
      const privacyCb = document.getElementById("accept-privacy");
      const accepted = termsCb.checked && privacyCb.checked;
      el.ttLoginBtn.disabled = !accepted;
      el.fbLoginBtn.disabled = !accepted;
      el.ttLabel.textContent = "Continue with TikTok";
    }
  }

  /* ---------- Init ---------- */
  async function init() {
    if (window.FB && typeof FB.getSession === "function" && FB.getSession()) {
      window.location.href = "/facebook/dashboard.html";
      return;
    }
    if (SL.getSession()) { window.location.href = "/dashboard.html"; return; }

    const termsCb = document.getElementById("accept-terms");
    const privacyCb = document.getElementById("accept-privacy");

    function updateButtonStates() {
      if (connecting) return;
      const accepted = termsCb.checked && privacyCb.checked;
      el.ttLoginBtn.disabled = !accepted;
      el.fbLoginBtn.disabled = !accepted;
    }

    /* Env badge */
    const hasFb = cfg.FB_APP_ID && !cfg.FB_APP_ID.startsWith("REPLACE_");
    const hasTt = cfg.TIKTOK_CLIENT_KEY && !cfg.TIKTOK_CLIENT_KEY.startsWith("REPLACE_");
    if (hasFb || hasTt) {
      el.envBadge.textContent = "Ready";
      el.envBadge.classList.add("ok");
    } else {
      el.envBadge.textContent = "Demo mode";
      el.envBadge.classList.add("warn");
    }

    /* Facebook SDK */
    if (hasFb) {
      try {
        await SL.loadFbSdk();
      } catch (err) { console.error(err); }
    }
    el.fbLabel.textContent = "Continue with Facebook";

    /* TikTok button */
    el.ttLabel.textContent = "Continue with TikTok";

    termsCb.addEventListener("change", updateButtonStates);
    privacyCb.addEventListener("change", updateButtonStates);

    el.fbLoginBtn.addEventListener("click", onFbLogin);
    el.ttLoginBtn.addEventListener("click", onTtLogin);

    updateButtonStates();
  }

  init();
})();
