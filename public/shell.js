(function () {
  "use strict";
  const cfg = window.SOCIALLIFT_CONFIG || {};
  const SESSION_KEY = "sl_session";

  function getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }
  function setSession(data) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }
  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function loadFbSdk() {
    return new Promise((resolve, reject) => {
      if (window.FB) return resolve();
      window.fbAsyncInit = function () {
        FB.init({
          appId: cfg.FB_APP_ID,
          cookie: true,
          xfbml: false,
          version: cfg.GRAPH_API_VERSION || "v25.0",
        });
        resolve();
      };
      const s = document.createElement("script");
      s.src = "https://connect.facebook.net/en_US/sdk.js";
      s.async = true;
      s.defer = true;
      s.crossOrigin = "anonymous";
      s.onerror = () => reject(new Error("Failed to load Facebook SDK"));
      document.head.appendChild(s);
    });
  }

  function injectShell(activePath) {
    const session = getSession();
    const links = [
      ["/dashboard.html", "Dashboard"],
      ["/accounts.html", "Accounts"],
      ["/compose.html", "Compose"],
      ["/posts.html", "Posts"],
      ["/inbox.html", "Inbox"],
      ["/analytics.html", "Analytics"],
      ["/settings.html", "Settings"],
    ];
    const nav = document.createElement("aside");
    nav.className = "app-sidebar";
    nav.innerHTML =
      '<div class="sidebar-brand">' +
      '<span class="brand-mark">SL</span>' +
      '<span class="brand-name">SocialLift</span>' +
      "</div>" +
      '<nav class="sidebar-nav"></nav>' +
      '<div class="sidebar-user"></div>';
    const navEl = nav.querySelector(".sidebar-nav");
    links.forEach(([href, label]) => {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      if (
        href === activePath ||
        (activePath === "/" && href === "/dashboard.html")
      )
        a.classList.add("active");
      navEl.appendChild(a);
    });
    if (session && session.user) {
      const u = nav.querySelector(".sidebar-user");
      const img = session.user.picture && session.user.picture.data
        ? session.user.picture.data.url
        : "";
      u.innerHTML =
        (img ? '<img src="' + img + '" alt="">' : "") +
        '<div class="u-meta">' +
        '<div class="u-name"></div>' +
        '<a href="/settings.html" class="u-link">Settings</a>' +
        "</div>";
      u.querySelector(".u-name").textContent = session.user.name;
    }
    document.body.classList.add("has-sidebar");
    document.body.insertBefore(nav, document.body.firstChild);
  }

  async function requireAuth(activePath) {
    const session = getSession();
    if (!session || !session.user) {
      window.location.href = "/";
      return null;
    }
    injectShell(activePath || window.location.pathname);
    try {
      await loadFbSdk();
    } catch (err) {
      console.error(err);
    }
    return session;
  }

  function toast(msg, kind) {
    const t = document.createElement("div");
    t.className = "toast " + (kind || "info");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }

  window.SL = {
    getSession,
    setSession,
    clearSession,
    loadFbSdk,
    requireAuth,
    toast,
    cfg,
  };
})();
