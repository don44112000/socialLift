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
  let connecting = false;

  async function onFbLogin() {
    if (connecting) return;
    connecting = true;
    el.fbLoginBtn.disabled = true;
    el.fbLabel.textContent = "Connecting…";

    if (window.FB && typeof window.FB.startFbLogin === "function") {
      // Opens the backend login in a popup modal; resets the button if cancelled.
      window.FB.startFbLogin({
        onCancel: function () {
          connecting = false;
          el.fbLoginBtn.disabled = false;
          el.fbLabel.textContent = "Continue with Facebook";
        },
      });
    } else {
      const backendBaseUrl = cfg.BACKEND_BASE_URL || "https://sociallift-backend-production.up.railway.app";
      window.location.href = backendBaseUrl + "/auth/facebook/login";
    }
  }

  /* ---------- TikTok login ---------- */
  /* TikTok integration is coming soon — its button is rendered disabled on the
     landing page and is intentionally not wired up. */

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
      el.fbLoginBtn.disabled = !accepted;
      // TikTok button stays disabled — integration is coming soon.
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
    el.fbLabel.textContent = "Continue with Facebook";

    termsCb.addEventListener("change", updateButtonStates);
    privacyCb.addEventListener("change", updateButtonStates);

    el.fbLoginBtn.addEventListener("click", onFbLogin);
    // TikTok button is intentionally not wired — coming soon.

    updateButtonStates();
  }

  init();
})();
