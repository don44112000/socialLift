(function () {
  "use strict";

  const SESSION_KEY = "sl_fb_session";
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
    ["/facebook/analytics.html", "Analytics", "leaderboard"],
    ["/facebook/activity.html", "Activity", "history"],
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
      '<div><p class="fb-shell-eyebrow">Lumen Studio</p><h1 class="fb-shell-title">' + pageTitle + "</h1></div></div>" +
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
    const cfg = window.WOUCHH_CONFIG || {};
    const hasFb = cfg.FB_APP_ID && !String(cfg.FB_APP_ID).startsWith("REPLACE_");

    if (hasFb) {
      const backendBaseUrl = cfg.BACKEND_BASE_URL || "https://sociallift-backend-production.up.railway.app";
      try {
        const meRes = await fetch(`${backendBaseUrl}/api/me`, { credentials: "include" });
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
        const accountsRes = await fetch(`${backendBaseUrl}/api/accounts`, { credentials: "include" });
        if (accountsRes.status === 401) {
          clearSession();
          window.location.href = "/";
          return null;
        }
        if (!accountsRes.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const accountsData = await accountsRes.json();

        // Map accounts
        const pages = accountsData.map((p) => ({
          id: p.page_id,
          name: p.page_name,
          platform: p.ig_business_account_id ? "instagram" : "facebook",
          username: p.ig_username || p.page_name.toLowerCase().replace(/\s+/g, ""),
          followers: 12000,
          posts: 95,
          engagement: "3.2%",
          instagram_business_account: p.ig_business_account_id
            ? {
                id: p.ig_business_account_id,
                username: p.ig_username,
              }
            : null,
        }));

        // Build session object
        const session = {
          user: {
            id: meData.fb_user_id,
            name: pages[0] ? pages[0].name : "Facebook User",
            email: "",
            picture: null,
          },
          pages: pages,
          business: {
            name: pages[0] ? pages[0].name : "Lumen Studio",
            shortName: pages[0] ? pages[0].name.split(" ")[0] : "Lumen",
            plan: "Premium Plan",
            logo: "/assets/logo-square.png",
            location: "India",
          },
          manager: {
            name: pages[0] ? pages[0].name : "Facebook User",
            role: "Admin",
            avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Manager&backgroundColor=e5eeff",
          },
          platforms: ["facebook", "instagram"],
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
  };
})();
