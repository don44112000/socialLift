(function () {
  "use strict";
  const cfg = window.WOUCHH_CONFIG || {};

  const SESSION_KEY = "sl_fb_session";
  const STATE_KEY = "fb_login_state";
  const DEFAULT_BACKEND = "https://sociallift-backend-production.up.railway.app";
  const MOBILE_QUERY = "(max-width: 1023px)";

  const ASSETS = {
    logoSquare: "/assets/logo-square.png",
    logoWide: "/assets/logo-wide.png",
    favicon: "/assets/logo-favicon.png",
  };

  const NAV = [
    ["/facebook/dashboard.html", "Dashboard", "dashboard"],
    ["/facebook/accounts.html", "Accounts", "group"],
    ["/facebook/mentions.html", "Mentions", "campaign"],
    ["/facebook/comments.html", "Comments", "forum"],
    ["/facebook/inbox.html", "Inbox", "mail"],
    ["/facebook/settings.html", "Settings", "settings"],
  ];

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

  /* ---------- Backend state (OAuth state + session key) ----------
     Every backend call carries a per-login UUID as a `state` query param so
     the backend can correlate the OAuth handshake with later API requests.
     The UUID is minted once at login (newState) and reused thereafter. */
  function backendBase() {
    return cfg.BACKEND_BASE_URL || DEFAULT_BACKEND;
  }

  function genUuid() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Mint a fresh state UUID for a new login and persist it in the cache.
  function newState() {
    const id = genUuid();
    sessionStorage.setItem(STATE_KEY, id);
    return id;
  }

  // Read the current login state UUID (null if there is no active login).
  function getState() {
    return sessionStorage.getItem(STATE_KEY);
  }

  // Build a backend API URL with the state UUID added as a `state` query param.
  // Accepts "accounts", "/accounts", or "/api/accounts" -> {backend}/api/accounts?state={state}
  // Preserves any existing query string, e.g. "/api/comments?account_id=1"
  // -> {backend}/api/comments?account_id=1&state={state}
  function apiUrl(path) {
    const state = getState() || "no_state";
    const clean = String(path || "").replace(/^\/?(api\/)?/, "");
    const sep = clean.indexOf("?") === -1 ? "?" : "&";
    return backendBase() + "/api/" + clean + sep + "state=" + encodeURIComponent(state);
  }

  // Build the Facebook OAuth login URL, minting + caching a fresh state UUID.
  function loginUrl() {
    return backendBase() + "/auth/facebook/login?state=" + encodeURIComponent(newState());
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "fb-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 3200);
  }

  function closeDrawer() {
    const aside = document.getElementById("fb-shell-aside");
    const overlay = document.getElementById("fb-shell-overlay");
    if (!aside || !overlay) return;
    aside.classList.remove("is-open");
    overlay.hidden = true;
    document.body.classList.remove("fb-drawer-open");
  }

  function openDrawer() {
    const aside = document.getElementById("fb-shell-aside");
    const overlay = document.getElementById("fb-shell-overlay");
    if (!aside || !overlay) return;
    aside.classList.add("is-open");
    overlay.hidden = false;
    document.body.classList.add("fb-drawer-open");
  }

  function mountShell(opts) {
    if (document.getElementById("fb-shell-aside")) return document.getElementById("fb-root");

    const session = getSession();
    const business = (session && session.business) || FBData.BUSINESS;
    const manager = (session && session.manager) || FBData.MANAGER;
    const activePath = opts.activePath || window.location.pathname;
    const pageTitle = opts.pageTitle || "Dashboard";
    const searchPh = opts.searchPlaceholder || "Search…";

    document.body.className = "fb-shell-body bg-background text-on-surface font-body-md antialiased";

    const overlay = document.createElement("button");
    overlay.type = "button";
    overlay.id = "fb-shell-overlay";
    overlay.className = "fb-shell-overlay";
    overlay.hidden = true;
    overlay.addEventListener("click", closeDrawer);

    const aside = document.createElement("aside");
    aside.id = "fb-shell-aside";
    aside.className = "fb-sidebar";

    let navHtml = "";
    NAV.forEach(([href, label, icon]) => {
      const active = href === activePath;
      navHtml +=
        '<a class="fb-nav-link ' +
        (active ? "is-active" : "") +
        '" href="' +
        href +
        '"><span class="material-symbols-outlined fb-nav-icon">' +
        icon +
        "</span><span>" +
        label +
        "</span></a>";
    });

    aside.innerHTML =
      '<div class="fb-sidebar-head">' +
      '<a href="/facebook/dashboard.html" class="fb-brand-link">' +
      '<img src="' + ASSETS.logoSquare + '" alt="" class="fb-brand-mark">' +
      '<div class="min-w-0"><span class="fb-brand-name">Wouchh</span>' +
      '<p class="fb-brand-sub">Management Suite</p></div></a>' +
      '<button type="button" class="fb-icon-button fb-mobile-close" id="fb-drawer-close" aria-label="Close navigation">' +
      '<span class="material-symbols-outlined">close</span></button></div>' +
      '<nav class="fb-nav">' + navHtml + "</nav>" +
      '<div class="fb-sidebar-foot">' +
      '<div class="fb-business-chip"><img src="' + business.logo + '" alt="" class="fb-business-logo">' +
      '<div><p class="fb-business-name">' + business.name + '</p><p class="fb-business-sub">' + business.location + "</p></div></div>" +
      "</div>";

    const shell = document.createElement("div");
    shell.className = "fb-shell";

    const header = document.createElement("header");
    header.className = "fb-shell-header";
    header.innerHTML =
      '<div class="fb-shell-header-left">' +
      '<button type="button" class="fb-icon-button fb-drawer-toggle" id="fb-drawer-toggle" aria-label="Open navigation">' +
      '<span class="material-symbols-outlined">sort</span></button>' +
      '<div><p class="fb-shell-eyebrow">' + business.name + '</p><h1 class="fb-shell-title">' + pageTitle + "</h1></div></div>" +
      '<div class="fb-shell-header-right">' +
      '<label class="fb-shell-search" aria-label="Search">' +
      '<span class="material-symbols-outlined">search</span>' +
      '<input type="search" placeholder="' + searchPh + '"></label>' +
      '<div class="fb-shell-user">' +
      '<div class="fb-shell-user-copy"><p>' + manager.name + "</p><span>" + manager.role + '</span></div>' +
      '<img src="' + manager.avatar + '" alt="" class="fb-shell-avatar"></div></div>';

    const main = document.createElement("main");
    main.className = "fb-shell-main";

    const contentWrap = document.createElement("div");
    contentWrap.className = "fb-content-root";
    contentWrap.id = "fb-root";

    const pageEl = document.getElementById("fb-page-content");
    if (pageEl) contentWrap.appendChild(pageEl);

    main.appendChild(header);
    main.appendChild(contentWrap);
    shell.appendChild(aside);
    shell.appendChild(main);

    document.body.appendChild(overlay);
    document.body.appendChild(shell);

    document.getElementById("fb-drawer-toggle").addEventListener("click", openDrawer);
    document.getElementById("fb-drawer-close").addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });

    const media = window.matchMedia(MOBILE_QUERY);
    function syncDrawer() {
      if (!media.matches) closeDrawer();
    }
    if (typeof media.addEventListener === "function") media.addEventListener("change", syncDrawer);
    else media.addListener(syncDrawer);

    aside.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia(MOBILE_QUERY).matches) closeDrawer();
      });
    });

    return contentWrap;
  }

  async function requireAuth(opts) {
    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");

    if (hasFb) {
      try {
        const meRes = await fetch(apiUrl("me"));
        if (meRes.status === 401) {
          clearSession();
          window.location.href = "/";
          return null;
        }
        if (!meRes.ok) {
          throw new Error("Failed to verify backend session");
        }
        const meData = await meRes.json();

        // Fetch accounts
        const accountsRes = await fetch(apiUrl("accounts"));
        if (accountsRes.status === 401) {
          clearSession();
          window.location.href = "/";
          return null;
        }
        if (!accountsRes.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const accountsData = await accountsRes.json();

        // Map the real accounts into the shape the shell/pages render. Numeric
        // metrics (followers/posts/engagement) are NOT returned by the backend
        // API, so they are left null rather than fabricated.
        const pages = accountsData.map((p) => ({
          id: p.page_id,
          name: p.page_name,
          platform: p.ig_business_account_id ? "instagram" : "facebook",
          username: p.ig_username || "",
          followers: null,
          posts: null,
          engagement: null,
          instagram_business_account: p.ig_business_account_id
            ? {
                id: p.ig_business_account_id,
                username: p.ig_username,
              }
            : null,
        }));

        // Derive identity from the real connected account(s).
        const primary = pages[0] || null;
        const bizName = primary ? primary.name : "Your business";
        const igHandle =
          primary && primary.instagram_business_account && primary.instagram_business_account.username
            ? "@" + primary.instagram_business_account.username
            : "";
        const hasInstagram = pages.some((p) => p.instagram_business_account);

        const session = {
          user: {
            id: meData.fb_user_id,
            name: bizName,
            email: "",
            picture: null,
          },
          pages: pages,
          business: {
            name: bizName,
            shortName: bizName.split(" ")[0],
            plan: null,
            logo: "/assets/logo-square.png",
            location: igHandle || (hasInstagram ? "Instagram connected" : "Facebook Page"),
          },
          manager: {
            name: bizName,
            role: "Connected",
            avatar:
              "https://api.dicebear.com/9.x/initials/svg?seed=" +
              encodeURIComponent(bizName) +
              "&backgroundColor=1877f2",
          },
          platforms: hasInstagram ? ["facebook", "instagram"] : ["facebook"],
          grantedAt: new Date().toISOString(),
          demo: false,
        };

        setSession(session);
        mountShell(opts || {});
        return session;
      } catch (err) {
        console.error("Auth check failed:", err);
        clearSession();
        window.location.href = "/";
        return null;
      }
    } else {
      const session = getSession();
      if (!session) {
        window.location.href = "/";
        return null;
      }
      mountShell(opts || {});
      return session;
    }
  }

  /* ---------- Popup-based OAuth login ----------
     The login + OAuth redirect runs in a popup window (a modal backdrop covers
     the app; if the browser opens it as a tab instead — an OS/browser choice we
     can't override — it still works). Completion is detected by POLLING our
     backend session (/api/me?state=): once the OAuth callback creates it, the
     poll returns 200 and we continue. This is robust to popup-vs-tab, to
     Facebook's COOP severing window.opener, and to cross-tab messaging quirks.
     A localStorage `storage` event from auth-callback.html is used only as a
     fast-path to poll immediately rather than waiting for the next tick. */
  const AUTH_POPUP_NAME = "wouchh_fb_login";
  const AUTH_RESULT_KEY = "wouchh_auth_result";

  function openAuthPopup(url) {
    const w = 600;
    const h = 720;
    const left = window.screenX + Math.max(0, (window.outerWidth - w) / 2);
    const top = window.screenY + Math.max(0, (window.outerHeight - h) / 2);
    const features =
      "popup=yes,width=" + w + ",height=" + h + ",left=" + left + ",top=" + top +
      ",menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes";
    return window.open(url, AUTH_POPUP_NAME, features);
  }

  function showAuthOverlay() {
    if (document.getElementById("fb-auth-overlay")) return;
    if (!document.getElementById("fb-auth-style")) {
      const st = document.createElement("style");
      st.id = "fb-auth-style";
      st.textContent = "@keyframes fbspin{to{transform:rotate(360deg)}}";
      document.head.appendChild(st);
    }
    const ov = document.createElement("div");
    ov.id = "fb-auth-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.style.cssText =
      "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;" +
      "background:rgba(10,12,20,.6);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);";
    const card = document.createElement("div");
    card.style.cssText =
      "background:#fff;color:#111;border-radius:16px;padding:28px 32px;max-width:340px;text-align:center;" +
      "font-family:system-ui,-apple-system,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.35);";
    card.innerHTML =
      '<div style="width:36px;height:36px;margin:0 auto 16px;border:3px solid #d8dbe6;border-top-color:#1877f2;border-radius:50%;animation:fbspin .8s linear infinite;"></div>' +
      '<h3 style="margin:0 0 8px;font-size:18px;font-weight:600;">Connecting your account</h3>' +
      '<p style="margin:0 0 18px;font-size:14px;line-height:1.5;color:#555;">Continue in the popup window to finish signing in. This will close automatically when you\'re done.</p>' +
      '<button type="button" id="fb-auth-cancel" style="border:0;background:#eef0f5;color:#333;padding:9px 18px;border-radius:8px;font-size:14px;cursor:pointer;">Cancel</button>';
    ov.appendChild(card);
    document.body.appendChild(ov);
  }

  function hideAuthOverlay() {
    const ov = document.getElementById("fb-auth-overlay");
    if (ov) ov.remove();
  }

  function watchAuthPopup(popup, opts) {
    let done = false;
    const POLL_MS = 1500;
    const MAX_MS = 3 * 60 * 1000; // give up after ~3 minutes
    let waited = 0;

    function finish(success) {
      if (done) return;
      done = true;
      clearInterval(timer);
      window.removeEventListener("storage", onStorage);
      try { localStorage.removeItem(AUTH_RESULT_KEY); } catch (e) {}
      try { if (popup && !popup.closed) popup.close(); } catch (e) {}
      hideAuthOverlay();
      if (success) {
        window.location.href = opts.redirectTo || "/facebook/dashboard.html";
      } else if (typeof opts.onCancel === "function") {
        opts.onCancel();
      } else {
        toast("Sign-in was cancelled.");
      }
    }

    // Source of truth: poll OUR backend session. Once the OAuth callback creates
    // it, /api/me?state= returns 200. Independent of popup-vs-tab, of
    // window.opener (severed by Facebook's COOP), and of cross-tab messaging.
    async function pollSession() {
      if (done) return;
      try {
        const res = await fetch(apiUrl("me"));
        if (res.ok) finish(true);
        // 401 → session not created yet; keep waiting.
      } catch (e) {
        // transient/CORS blip mid-OAuth — keep waiting.
      }
    }

    // Fast-path: auth-callback.html (same origin) writes AUTH_RESULT_KEY to
    // localStorage, firing a `storage` event here — poll immediately instead of
    // waiting for the next tick.
    function onStorage(ev) {
      if (ev.key === AUTH_RESULT_KEY && ev.newValue) pollSession();
    }
    window.addEventListener("storage", onStorage);

    const cancelBtn = document.getElementById("fb-auth-cancel");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        try { if (popup && !popup.closed) popup.close(); } catch (e) {}
        finish(false);
      });
    }

    const timer = setInterval(function () {
      waited += POLL_MS;
      pollSession();
      if (waited >= MAX_MS) finish(false);
    }, POLL_MS);

    pollSession(); // immediate first check
  }

  function startFbLogin(opts) {
    opts = opts || {};
    // Clear any stale result so we only react to this attempt's signal.
    try { localStorage.removeItem(AUTH_RESULT_KEY); } catch (e) {}

    const url = loginUrl(); // mints + caches a fresh state UUID
    const popup = openAuthPopup(url);
    if (!popup) {
      // Popup blocked → fall back to a full-page redirect (same state).
      window.location.href = url;
      return;
    }
    try { popup.focus(); } catch (e) {}
    showAuthOverlay();
    watchAuthPopup(popup, opts);
  }

  // Overlay a "Coming soon" card on a page region whose data has no live API
  // yet: the existing (demo) content stays visible but greyed-out and inert.
  // The page header (#page-head) is kept crisp; everything else is dimmed.
  function markComingSoon(target, label) {
    const host = typeof target === "string" ? document.querySelector(target) : target;
    if (!host || host.dataset.soon) return;
    host.dataset.soon = "1";

    const inner = host.querySelector(".space-y-6") || host;
    const head = inner.querySelector("#page-head");

    const dim = document.createElement("div");
    dim.className = "fb-soon-content";
    Array.from(inner.children).forEach((child) => {
      if (child !== head) dim.appendChild(child);
    });

    const zone = document.createElement("div");
    zone.className = "fb-soon-host";
    zone.appendChild(dim);

    const overlay = document.createElement("div");
    overlay.className = "fb-soon-overlay";
    overlay.innerHTML =
      '<div class="fb-soon-card">' +
        '<span class="material-symbols-outlined">schedule</span>' +
        '<p class="fb-soon-title">' + (label || "Coming soon") + "</p>" +
        '<p class="fb-soon-sub">Live data for this view isn’t available yet.</p>' +
      "</div>";
    zone.appendChild(overlay);

    inner.appendChild(zone);
  }

  window.FB = {
    ASSETS,
    getSession,
    setSession,
    clearSession,
    requireAuth,
    mountShell,
    openDrawer,
    closeDrawer,
    toast,
    startFbLogin,
    newState,
    getState,
    apiUrl,
    loginUrl,
    markComingSoon,
  };
})();
