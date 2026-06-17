(function () {
  "use strict";

  async function completeFacebookLogin() {
    const cfg = window.WOUCHH_CONFIG || {};

    function fbLogin() {
      return new Promise((resolve, reject) => {
        if (!window.FB) {
          reject(new Error("Facebook SDK not loaded"));
          return;
        }
        FB.login(
          (r) => (r.authResponse ? resolve(r.authResponse) : reject(new Error("Login cancelled"))),
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

    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");
    if (hasFb && window.FB) {
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
      return {
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
          logo: "/assets/logo-square.png",
          location: "India",
        },
        manager: { name: me.name, role: "Admin", avatar: FBData.MANAGER.avatar },
        platforms: ["facebook", "instagram"],
        grantedAt: new Date().toISOString(),
        demo: false,
      };
    }

    throw new Error("Facebook SDK/login config mismatch or failed to load.");
  }

  window.FBAuth = { completeFacebookLogin };
})();
