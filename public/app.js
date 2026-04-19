(function () {
  "use strict";

  const cfg = window.SOCIALLIFT_CONFIG || {};
  const el = {
    envBadge: document.getElementById("env-badge"),
    loginBtn: document.getElementById("fb-login-btn"),
    loginLabel: document.getElementById("fb-login-label"),
    errorBanner: document.getElementById("error-banner"),
  };

  function showError(msg) {
    if (!el.errorBanner) return alert(msg);
    el.errorBanner.hidden = false;
    el.errorBanner.textContent = msg;
  }

  function setBadge() {
    if (!cfg.FB_APP_ID || cfg.FB_APP_ID.startsWith("REPLACE_")) {
      el.envBadge.textContent = "FB_APP_ID not set";
      el.envBadge.classList.add("err");
      showError("Set FB_APP_ID in public/config.js before logging in.");
      return false;
    }
    el.envBadge.textContent = "App " + cfg.FB_APP_ID;
    el.envBadge.classList.add("ok");
    return true;
  }

  function fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(
        (r) =>
          r.authResponse
            ? resolve(r.authResponse)
            : reject(new Error("Login cancelled")),
        {
          scope: (cfg.SCOPES || []).join(","),
          return_scopes: true,
          auth_type: "rerequest",
        }
      );
    });
  }

  function fbGet(path, params) {
    return new Promise((resolve, reject) => {
      FB.api(path, "GET", params || {}, (res) => {
        if (!res || res.error)
          reject(
            new Error(
              (res && res.error && res.error.message) || "API error"
            )
          );
        else resolve(res);
      });
    });
  }

  async function onLoginClick() {
    el.loginBtn.disabled = true;
    el.loginLabel.textContent = "Opening Facebook…";
    try {
      const auth = await fbLogin();
      const user = await fbGet("/me", {
        fields: "id,name,picture.width(100).height(100)",
      });
      const pagesRes = await fbGet("/me/accounts", {
        fields:
          "id,name,category,tasks,access_token,instagram_business_account{id,username,profile_picture_url}",
        limit: 100,
      });
      SL.setSession({
        user: user,
        userAccessToken: auth.accessToken,
        grantedScopes: (auth.grantedScopes || "").split(","),
        pages: pagesRes.data || [],
        grantedAt: new Date().toISOString(),
      });
      try {
        await fetch(cfg.BACKEND_TOKEN_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: { id: user.id, name: user.name, userAccessToken: auth.accessToken },
            pages: (pagesRes.data || []).map((p) => ({
              id: p.id,
              name: p.name,
              category: p.category,
              tasks: p.tasks,
              pageAccessToken: p.access_token,
              instagramBusinessAccount: p.instagram_business_account
                ? {
                    id: p.instagram_business_account.id,
                    username: p.instagram_business_account.username,
                  }
                : null,
            })),
            grantedAt: new Date().toISOString(),
          }),
        });
      } catch (_) {}
      window.location.href = "/dashboard.html";
    } catch (err) {
      showError(err.message || String(err));
      el.loginBtn.disabled = false;
      el.loginLabel.textContent = "Continue with Facebook";
    }
  }

  async function init() {
    if (SL.getSession()) {
      window.location.href = "/dashboard.html";
      return;
    }
    if (!setBadge()) return;
    try {
      await SL.loadFbSdk();
      el.loginBtn.disabled = false;
      el.loginLabel.textContent = "Continue with Facebook";
    } catch (err) {
      showError(err.message);
      return;
    }
    el.loginBtn.addEventListener("click", onLoginClick);
  }

  init();
})();
