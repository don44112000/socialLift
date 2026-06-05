(function () {
  "use strict";

  const SPARK_TEAL = "M0 35 Q 20 15, 40 25 T 80 5 T 100 20";
  const SPARK_ORANGE = "M0 30 L 10 25 L 20 35 L 30 20 L 40 25 L 50 10 L 60 15 L 70 5 L 80 15 L 90 10 L 100 5";

  function metricCard(opts) {
    const d = document.createElement("div");
    d.className =
      "bg-surface-container-lowest p-lg rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:shadow-lg transition-all border border-transparent hover:border-primary/10 border-outline-variant/30";
    const badgeCls = opts.badgeOrange
      ? "text-secondary bg-secondary-fixed"
      : "text-primary bg-primary-container/20";
    d.innerHTML =
      "<div><div class=\"flex justify-between items-start mb-1\"><span class=\"text-on-surface-variant font-label-md text-label-md uppercase tracking-wide\">" +
      opts.label +
      '</span><span class="' +
      badgeCls +
      ' px-2 py-0.5 rounded-full text-[10px] font-bold">' +
      (opts.badge || "") +
      '</span></div><p class="font-headline-lg text-headline-lg text-on-surface">' +
      opts.value +
      '</p></div><div class="sparkline-container mt-md"><svg class="w-full h-12" viewBox="0 0 100 40"><path d="' +
      (opts.spark || SPARK_TEAL) +
      '" fill="none" stroke="' +
      (opts.stroke || "#006a63") +
      '" stroke-width="2" vector-effect="non-scaling-stroke"></path></svg></div>';
    return d;
  }

  function pageHeader(title, subtitle) {
    const wrap = document.createElement("div");
    wrap.className = "fb-page-shell";
    wrap.innerHTML =
      '<div><h2 class="font-display-lg text-display-lg text-on-background">' +
      title +
      '</h2><p class="fb-page-lead">' +
      (subtitle || "") +
      "</p></div>";
    return wrap;
  }

  function tabBar(buttons, onSelect) {
    const bar = document.createElement("div");
    bar.className = "flex flex-wrap gap-2";
    buttons.forEach((b, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "min-h-[44px] px-4 py-2 rounded-full text-body-sm font-semibold border transition-colors " +
        (i === 0
          ? "bg-primary text-white border-primary"
          : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:bg-surface-container-low");
      btn.textContent = b.label;
      btn.dataset.value = b.value;
      btn.addEventListener("click", () => {
        bar.querySelectorAll("button").forEach((x) => {
          x.className =
            "px-4 py-2 rounded-full text-body-sm font-semibold border transition-colors bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:bg-surface-container-low";
        });
        btn.className =
          "px-4 py-2 rounded-full text-body-sm font-semibold border transition-colors bg-primary text-white border-primary";
        onSelect(b.value);
      });
      bar.appendChild(btn);
    });
    return bar;
  }

  function emptyState(title, body) {
    const el = document.createElement("div");
    el.className = "fb-panel fb-empty";
    el.innerHTML = "<h3 class=\"font-headline-md text-headline-md mb-2\">" + title + "</h3><p>" + body + "</p>";
    return el;
  }

  window.FBUi = {
    emptyState,
    metricCard,
    pageHeader,
    tabBar,
    SPARK_TEAL,
    SPARK_ORANGE,
  };
})();
