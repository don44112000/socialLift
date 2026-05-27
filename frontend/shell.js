(function () {
  "use strict";
  const cfg = window.SOCIALLIFT_CONFIG || {};
  const SESSION_KEY = "sl_session";

  /* ---------- Session helpers ---------- */
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); }
    catch { return null; }
  }
  function setSession(data) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(data)); }
  function clearSession()   { sessionStorage.removeItem(SESSION_KEY); }

  /* ---------- Facebook SDK loader ---------- */
  function loadFbSdk() {
    return new Promise((resolve, reject) => {
      if (window.FB) return resolve();
      window.fbAsyncInit = function () {
        FB.init({ appId: cfg.FB_APP_ID, cookie: true, xfbml: false, version: cfg.GRAPH_API_VERSION || "v25.0" });
        resolve();
      };
      const s = document.createElement("script");
      s.src = "https://connect.facebook.net/en_US/sdk.js";
      s.async = true; s.defer = true; s.crossOrigin = "anonymous";
      s.onerror = () => reject(new Error("Failed to load Facebook SDK"));
      document.head.appendChild(s);
    });
  }

  /* ---------- Nav icon SVGs ---------- */
  const icons = {
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    accounts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    mentions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>',
    comments: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    posts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    compose: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    analytics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  };

  /* ---------- Sidebar injection ---------- */
  function injectShell(activePath) {
    const session = getSession();
    const appName = cfg.COMPANY_NAME || "SocialLift";

    const links = [
      ["/dashboard.html", "Dashboard",  icons.dashboard],
      ["/accounts.html",  "Accounts",   icons.accounts],
      ["/mentions.html",  "Mentions",   icons.mentions],
      ["/comments.html",  "Comments",   icons.comments],
      ["/inbox.html",     "Inbox",      icons.inbox],
      ["/posts.html",     "Content",    icons.posts],
      ["/compose.html",   "Compose",    icons.compose],
      ["/analytics.html", "Analytics",  icons.analytics],
      ["/settings.html",  "Settings",   icons.settings],
    ];

    const nav = document.createElement("aside");
    nav.className = "app-sidebar";

    /* Brand */
    const brandDiv = document.createElement("div");
    brandDiv.className = "sidebar-brand";
    brandDiv.innerHTML = '<span class="brand-mark">SL</span><span class="brand-name"></span>';
    brandDiv.querySelector(".brand-name").textContent = appName;
    nav.appendChild(brandDiv);

    /* Section label */
    const secLabel = document.createElement("div");
    secLabel.className = "sidebar-section-label";
    secLabel.textContent = "Platform";
    nav.appendChild(secLabel);

    /* Nav links */
    const navEl = document.createElement("nav");
    navEl.className = "sidebar-nav";
    links.forEach(([href, label, icon]) => {
      const a = document.createElement("a");
      a.href = href;
      const iconSpan = document.createElement("span");
      iconSpan.className = "nav-icon";
      iconSpan.innerHTML = icon;
      a.appendChild(iconSpan);
      a.appendChild(document.createTextNode(label));
      if (href === activePath || (activePath === "/" && href === "/dashboard.html")) {
        a.classList.add("active");
      }
      navEl.appendChild(a);
    });
    nav.appendChild(navEl);

    /* User block */
    if (session) {
      const u = document.createElement("div");
      u.className = "sidebar-user";
      const name = (session.tiktok && session.tiktok.display_name) ||
                   (session.user && session.user.name) || "User";
      const pic  = (session.tiktok && session.tiktok.avatar_url) ||
                   (session.user && session.user.picture && session.user.picture.data && session.user.picture.data.url) || "";
      if (pic) {
        const img = document.createElement("img");
        img.src = pic; img.alt = "";
        u.appendChild(img);
      }
      const meta = document.createElement("div");
      meta.innerHTML = '<div class="u-name"></div><a href="/settings.html" class="u-link">Settings</a>';
      meta.querySelector(".u-name").textContent = name;
      u.appendChild(meta);
      nav.appendChild(u);
    }

    document.body.classList.add("has-sidebar");
    document.body.insertBefore(nav, document.body.firstChild);
  }

  /* ---------- Auth guard ---------- */
  async function requireAuth(activePath) {
    const session = getSession();
    if (!session) { window.location.href = "/"; return null; }
    injectShell(activePath || window.location.pathname);
    if (session.user) {
      try { await loadFbSdk(); } catch (err) { console.error(err); }
    }
    return session;
  }

  /* ---------- Toast ---------- */
  function toast(msg, kind) {
    const t = document.createElement("div");
    t.className = "toast " + (kind || "info");
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => t.classList.add("show"));
    });
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }

  /* ---------- Public API ---------- */
  window.SL = { getSession, setSession, clearSession, loadFbSdk, requireAuth, toast, cfg };
})();
