(function () {
  "use strict";

  const SESSION_KEY = "sl_fb_session";

  const ASSETS = {
    logoSquare: "/assets/logo-square.png",
    logoWide: "/assets/logo-wide.png",
    favicon: "/assets/logo-favicon.png",
  };

  const NAV = [
    ["/facebook/dashboard.html", "Dashboard", "dashboard"],
    ["/facebook/mentions.html", "Social Mentions", "public"],
    ["/facebook/comments.html", "Comments", "forum"],
    ["/facebook/inbox.html", "Inboxes", "mail"],
    ["/facebook/analytics.html", "Analytics", "leaderboard"],
    ["/facebook/activity.html", "Activity", "reorder"],
    ["/facebook/accounts.html", "Accounts", "group"],
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

  function mountShell(opts) {
    if (document.getElementById("fb-shell-aside")) return document.getElementById("fb-root");

    const session = getSession();
    const r = (session && session.restaurant) || FBData.RESTAURANT;
    const m = (session && session.manager) || FBData.MANAGER;
    const appName = (window.WOUCHH_CONFIG && window.WOUCHH_CONFIG.COMPANY_NAME) || "Wouchh";
    const activePath = opts.activePath || window.location.pathname;
    const pageTitle = opts.pageTitle || "Dashboard";
    const searchPh = opts.searchPlaceholder || "Search…";

    document.body.className = "bg-background text-on-surface font-body-md antialiased";

    const aside = document.createElement("aside");
    aside.id = "fb-shell-aside";
    aside.className =
      "fixed left-0 top-0 h-full w-[260px] bg-surface shadow-sm flex flex-col py-lg z-50 border-r border-outline-variant/40";

    let navHtml = "";
    NAV.forEach(([href, label, ic]) => {
      const active = href === activePath;
      navHtml +=
        '<a class="flex items-center px-lg py-md transition-all ' +
        (active
          ? "text-primary font-bold border-l-4 border-primary bg-primary-container/10"
          : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low border-l-4 border-transparent") +
        '" href="' +
        href +
        '"><span class="material-symbols-outlined mr-md">' +
        ic +
        "</span><span>" +
        label +
        "</span></a>";
    });

    aside.innerHTML =
      '<div class="px-lg mb-xl">' +
      '<a href="/facebook/dashboard.html" class="flex items-center gap-3 no-underline text-inherit">' +
      '<img src="' +
      ASSETS.logoSquare +
      '" alt="" class="w-10 h-10 rounded-lg object-contain shrink-0">' +
      '<div class="min-w-0">' +
      '<span class="font-headline-md text-headline-md font-bold text-primary block leading-tight">' +
      appName +
      '</span><p class="text-on-surface-variant text-[10px] uppercase tracking-widest">Management Suite</p>' +
      "</div></a></div>" +
      '<nav class="flex-1 overflow-y-auto hide-scrollbar space-y-0">' +
      navHtml +
      "</nav>" +
      '<div class="px-lg mt-auto pt-lg border-t border-outline-variant">' +
      '<div class="flex items-center gap-md">' +
      '<img src="' +
      r.logo +
      '" alt="" class="w-10 h-10 rounded-lg object-cover">' +
      "<div><p class=\"font-label-md text-label-md font-bold text-on-surface\">" +
      r.shortName +
      '</p><p class="text-on-surface-variant text-[10px] uppercase tracking-wider">' +
      r.plan +
      "</p></div></div></div>";

    const main = document.createElement("main");
    main.className = "ml-[260px] min-h-screen";

    const header = document.createElement("header");
    header.className =
      "fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-lg z-40";
    header.innerHTML =
      '<div class="flex items-center flex-1 gap-lg">' +
      '<h2 class="font-headline-md text-headline-md text-on-surface whitespace-nowrap hidden lg:block">' +
      pageTitle +
      '</h2><div class="relative w-full max-w-md">' +
      '<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>' +
      '<input class="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary text-body-sm" placeholder="' +
      searchPh +
      '" type="text"/></div></div>' +
      '<div class="flex items-center gap-lg">' +
      '<button type="button" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all" aria-label="Notifications"><span class="material-symbols-outlined text-on-surface-variant">notifications</span></button>' +
      '<button type="button" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all" aria-label="Help"><span class="material-symbols-outlined text-on-surface-variant">help</span></button>' +
      '<div class="h-8 w-px bg-outline-variant"></div>' +
      '<div class="flex items-center gap-md">' +
      '<div class="text-right hidden sm:block"><p class="font-label-md text-label-md font-bold">' +
      m.name +
      '</p><p class="text-on-surface-variant text-[10px]">' +
      m.role +
      '</p></div><img src="' +
      m.avatar +
      '" alt="" class="w-10 h-10 rounded-full border-2 border-surface-variant object-cover"></div></div>';

    const contentWrap = document.createElement("div");
    contentWrap.className = "pt-24 px-lg pb-2xl max-w-[1440px] mx-auto hide-scrollbar";
    contentWrap.id = "fb-root";

    const pageEl = document.getElementById("fb-page-content");
    if (pageEl) contentWrap.appendChild(pageEl);

    main.appendChild(header);
    main.appendChild(contentWrap);

    document.body.appendChild(aside);
    document.body.appendChild(main);

    return contentWrap;
  }

  async function requireAuth(opts) {
    const session = getSession();
    if (!session) {
      window.location.href = "/";
      return null;
    }
    mountShell(opts || {});
    return session;
  }

  window.FB = {
    ASSETS,
    getSession,
    setSession,
    clearSession,
    requireAuth,
    mountShell,
    toast,
  };
})();
