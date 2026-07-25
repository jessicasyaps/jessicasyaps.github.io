/**
 * script.js — renders DATA into the page and wires up all interactivity.
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmtCompact = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
    return String(n);
  };
  const fmtFull = (n) => n.toLocaleString("en-US");
  const objToRows = (obj) => Object.entries(obj).map(([label, pct]) => ({ label, pct }));

  /* ============ FLAG ICONS ============
     Unicode regional-indicator flag emoji do not render as pictures on every
     platform (notably Windows Chrome, where they fall back to two-letter
     text). These small inline SVGs render identically everywhere. */
  const FLAGS = {
    GB: '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#00247d"/><path d="M0,0L60,40M60,0L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0L60,40M60,0L0,40" stroke="#cf142b" stroke-width="4"/><path d="M30,0V40M0,20H60" stroke="#fff" stroke-width="12"/><path d="M30,0V40M0,20H60" stroke="#cf142b" stroke-width="6"/></svg>',
    RO: '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#002B7F"/><rect x="20" width="20" height="40" fill="#FCD116"/><rect x="40" width="20" height="40" fill="#CE1126"/></svg>',
    DE: '<svg viewBox="0 0 60 40"><rect width="60" height="13.3" fill="#000"/><rect y="13.3" width="60" height="13.3" fill="#DD0000"/><rect y="26.6" width="60" height="13.4" fill="#FFCE00"/></svg>',
    IT: '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#008C45"/><rect x="20" width="20" height="40" fill="#F4F5F0"/><rect x="40" width="20" height="40" fill="#CD212A"/></svg>',
    US: '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#B22234"/><rect y="3.1" width="60" height="3.1" fill="#fff"/><rect y="9.2" width="60" height="3.1" fill="#fff"/><rect y="15.4" width="60" height="3.1" fill="#fff"/><rect y="21.5" width="60" height="3.1" fill="#fff"/><rect y="27.7" width="60" height="3.1" fill="#fff"/><rect y="33.8" width="60" height="3.1" fill="#fff"/><rect width="24" height="21.5" fill="#3C3B6E"/></svg>',
    IE: '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#169B62"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#FF883E"/></svg>',
    ES: '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/></svg>',
    FR: '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#0055A4"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#EF4135"/></svg>',
    BE: '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#000"/><rect x="20" width="20" height="40" fill="#FDDA24"/><rect x="40" width="20" height="40" fill="#EF3340"/></svg>',
    NL: '<svg viewBox="0 0 60 40"><rect width="60" height="13.3" fill="#AE1C28"/><rect y="13.3" width="60" height="13.3" fill="#fff"/><rect y="26.6" width="60" height="13.4" fill="#21468B"/></svg>'
  };
  const COUNTRY_CODES = {
    "Romania": "RO", "UK": "GB", "Germany": "DE", "Italy": "IT",
    "United States": "US", "Spain": "ES", "France": "FR", "Ireland": "IE",
    "Belgium": "BE", "Netherlands": "NL"
  };
  const flagIcon = (code) => (code && FLAGS[code]) ? `<span class="flag-icon" aria-hidden="true">${FLAGS[code]}</span>` : "";

  /* ============ NAV ============ */
  function initNav() {
    const nav = document.getElementById("siteNav");
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");

    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ============ SCROLLSPY ============ */
  function initScrollspy() {
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const linksBySection = new Map();
    navLinks.forEach((link) => {
      const id = link.getAttribute("href").replace("#", "");
      if (id && id !== "top") linksBySection.set(id, link);
    });

    const sections = Array.from(linksBySection.keys())
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const setActive = (id) => {
      navLinks.forEach((l) => l.classList.remove("active"));
      const link = linksBySection.get(id);
      if (link) link.classList.add("active");
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    sections.forEach((s) => observer.observe(s));
  }

  /* ============ HERO / CONTACT LINKS ============ */
  function initLinks() {
    document.getElementById("heroTikTok").href = DATA.tiktok.url;
    document.getElementById("heroInstagram").href = DATA.instagram.url;
    document.getElementById("heroYouTube").href = DATA.youtube.url;
    document.getElementById("contactTikTok").href = DATA.tiktok.url;
    document.getElementById("contactInstagram").href = DATA.instagram.url;
    document.getElementById("contactYouTube").href = DATA.youtube.url;
    document.getElementById("heroName").textContent = DATA.hero.name;
    document.getElementById("heroRole").textContent = DATA.hero.role;
    document.getElementById("heroTagline").textContent = DATA.hero.tagline;

    const heroImg = document.querySelector(".hero-photo");
    heroImg.src = DATA.hero.photo;
    heroImg.alt = DATA.hero.name + ", portrait photo";

    document.getElementById("contactEmail").textContent = DATA.email;
    document.getElementById("contactLocation").textContent = "📍 " + DATA.location;
    document.getElementById("footerYear").textContent = new Date().getFullYear();

    const btnFlag = document.getElementById("romanianBtnFlag");
    if (btnFlag) btnFlag.innerHTML = FLAGS.RO;
  }

  /* ============ ABOUT ============ */
  function initAbout() {
    const d = DATA.about;
    const bioEl = document.getElementById("aboutBio");
    bioEl.innerHTML = d.bio.map((p) => `<p>${p}</p>`).join("");

    const aboutImg = document.querySelector(".about-photo-wrap img");
    aboutImg.src = d.photo;
    aboutImg.alt = "Jessica, about photo";

    document.getElementById("calloutNote").textContent = d.calloutNote;

    let idx = -1;
    const btn = document.getElementById("romanianBtn");
    const out = document.getElementById("romanianOutput");
    btn.addEventListener("click", () => {
      idx = (idx + 1) % d.romanianWords.length;
      const word = d.romanianWords[idx];
      out.textContent = `${word.word}: ${word.meaning}`;
    });
  }

  /* ============ CHARTS ============ */
  const PALETTE = {
    female: "#f4568e",
    male: "#7cc7d9",
    other: "#f2b544"
  };

  function renderDonut(svgId, legendId, genderData, titleText) {
    const svg = document.getElementById(svgId);
    const legend = document.getElementById(legendId);
    const r = 50;
    const circumference = 2 * Math.PI * r;
    const cx = 60, cy = 60;

    const entries = [
      { label: "Female", pct: genderData.female, color: PALETTE.female },
      { label: "Male", pct: genderData.male, color: PALETTE.male },
      { label: "Other", pct: genderData.other, color: PALETTE.other }
    ].filter((e) => e.pct > 0);

    let circles = svg.querySelectorAll("circle");
    if (circles.length !== entries.length) {
      svg.innerHTML = `<title>${titleText}</title>` + entries.map(() =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke-width="18" transform="rotate(-90 ${cx} ${cy})"/>`
      ).join("");
      circles = svg.querySelectorAll("circle");
    }

    let offsetAcc = 0;
    entries.forEach((e, i) => {
      const dash = (e.pct / 100) * circumference;
      const circle = circles[i];
      circle.setAttribute("stroke", e.color);
      circle.setAttribute("stroke-dasharray", `${dash} ${circumference - dash}`);
      circle.setAttribute("stroke-dashoffset", -offsetAcc);
      offsetAcc += dash;
    });

    legend.innerHTML = entries.map((e) =>
      `<div class="legend-row"><span class="legend-swatch" style="background:${e.color}"></span>${e.label} ${e.pct}%</div>`
    ).join("");
  }

  function renderBarChart(containerId, rows, horizontal, withFlags) {
    const el = document.getElementById(containerId);
    if (horizontal) el.classList.add("bar-chart-horizontal");

    const existingRows = el.querySelectorAll(".bar-row");
    if (existingRows.length !== rows.length) {
      el.innerHTML = rows.map((row) => `
        <div class="bar-row">
          <span class="bar-label">${withFlags ? flagIcon(COUNTRY_CODES[row.label]) : ""}${row.label}</span>
          <div class="bar-track"><div class="bar-fill" data-pct="${row.pct}"></div></div>
          <span class="bar-value">${row.pct}%</span>
        </div>
      `).join("");
      return;
    }

    // Same shape as before (tab switch): update the existing bars in place
    // so the CSS width transition morphs them smoothly instead of resetting.
    rows.forEach((row, i) => {
      const rowEl = existingRows[i];
      rowEl.querySelector(".bar-label").innerHTML = `${withFlags ? flagIcon(COUNTRY_CODES[row.label]) : ""}${row.label}`;
      const fill = rowEl.querySelector(".bar-fill");
      fill.dataset.pct = row.pct;
      fill.style.width = row.pct + "%";
      rowEl.querySelector(".bar-value").textContent = row.pct + "%";
    });
  }

  function animateBars(container) {
    container.querySelectorAll(".bar-fill").forEach((fill) => {
      const pct = parseFloat(fill.dataset.pct);
      requestAnimationFrame(() => { fill.style.width = pct + "%"; });
    });
  }

  /* ---- Follower growth chart (60 day window) ---- */
  function renderGrowthChart(svgId, g) {
    const svg = document.getElementById(svgId);
    const w = 320, h = 130;
    const padLeft = 42, padRight = 10, padTop = 14, padBottom = 24;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    const stepX = plotW / (g.points.length - 1);
    const xAt = (i) => padLeft + i * stepX;
    const yAt = (v) => padTop + plotH - (v / g.yAxisMax) * plotH;

    const points = g.points.map((v, i) => [xAt(i), yAt(v)]);
    const linePath = points.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const fillPath = linePath + ` L${points[points.length - 1][0]},${padTop + plotH} L${points[0][0]},${padTop + plotH} Z`;
    const baselineY = (padTop + plotH).toFixed(1);
    const gradientId = `${svgId}Gradient`;

    // Build the static structure once; every later call (tab switch) just
    // updates attributes in place so the CSS transitions morph the shapes
    // instead of the chart flashing to a freshly built one.
    if (svg.dataset.built !== "1") {
      svg.innerHTML = `
        <defs>
          <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff86ae" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#ff86ae" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <line class="trend-gridline" id="${svgId}BaseLine" x1="${padLeft}" y1="${baselineY}" x2="${w - padRight}" y2="${baselineY}"></line>
        <text class="trend-axis-label" id="${svgId}BaseLabel" x="${padLeft - 8}" y="${(padTop + plotH + 3).toFixed(1)}" text-anchor="end">0</text>
        ${g.yAxisTicks.map((_, i) => `
          <line class="trend-gridline" id="${svgId}TickLine${i}" x1="${padLeft}" y1="${baselineY}" x2="${w - padRight}" y2="${baselineY}"></line>
          <text class="trend-axis-label" id="${svgId}TickLabel${i}" x="${padLeft - 8}" y="${(padTop + plotH + 3).toFixed(1)}" text-anchor="end"></text>
        `).join("")}
        <path class="trend-fill" id="${svgId}FillPath" style="fill:url(#${gradientId})" d="${fillPath}"></path>
        <path class="trend-path" id="${svgId}PathLine" d="${linePath}" pathLength="1"></path>
        <circle class="trend-dot" id="${svgId}Dot" cx="${points[points.length - 1][0]}" cy="${points[points.length - 1][1]}" r="4"></circle>
        <text class="trend-axis-label" id="${svgId}XStart" x="${padLeft}" y="${h - 6}" text-anchor="start">${g.xStart}</text>
        <text class="trend-axis-label" id="${svgId}XEnd" x="${w - padRight}" y="${h - 6}" text-anchor="end">${g.xEnd}</text>
      `;
      svg.dataset.built = "1";
    }

    document.getElementById(`${svgId}BaseLine`).setAttribute("y1", baselineY);
    document.getElementById(`${svgId}BaseLine`).setAttribute("y2", baselineY);

    g.yAxisTicks.forEach((value, i) => {
      const y = yAt(value).toFixed(1);
      const line = document.getElementById(`${svgId}TickLine${i}`);
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      const label = document.getElementById(`${svgId}TickLabel${i}`);
      label.setAttribute("y", (parseFloat(y) + 3).toFixed(1));
      label.textContent = fmtCompact(value);
    });

    document.getElementById(`${svgId}FillPath`).setAttribute("d", fillPath);
    document.getElementById(`${svgId}PathLine`).setAttribute("d", linePath);

    const dot = document.getElementById(`${svgId}Dot`);
    dot.setAttribute("cx", points[points.length - 1][0]);
    dot.setAttribute("cy", points[points.length - 1][1]);

    document.getElementById(`${svgId}XStart`).textContent = g.xStart;
    document.getElementById(`${svgId}XEnd`).textContent = g.xEnd;
  }

  function animateTrendLine(svgId) {
    const path = document.getElementById(`${svgId}PathLine`);
    if (!path) return;
    if (prefersReducedMotion) {
      path.style.strokeDasharray = "none";
      return;
    }
    path.classList.add("trend-path-no-anim");
    path.style.strokeDasharray = "1";
    path.style.strokeDashoffset = "1";
    void path.getBoundingClientRect(); // force reflow so the reset above applies before re-enabling transitions
    path.classList.remove("trend-path-no-anim");
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });
  }

  /* ============ AUDIENCE: FOLLOWERS HEADING ============ */
  function renderFollowersHeading(platform) {
    const total = platform === "tiktok" ? DATA.tiktok.followers.total : DATA.instagram.followers.total;
    const label = platform === "tiktok" ? "TikTok" : "Instagram";
    document.getElementById("audienceFollowersHeading").textContent =
      `${fmtCompact(total)} ${label} followers`;
  }

  /* ============ AUDIENCE PANEL ============
     A single set of chart elements is shared by both platforms. Switching
     tabs re-renders the same DOM nodes with the other platform's numbers,
     so the CSS transitions on bar width / donut arcs / trend-line path
     morph smoothly between the two instead of swapping panels. */
  function renderAudiencePanel(platform) {
    const isTikTok = platform === "tiktok";
    const gender = isTikTok ? DATA.tiktok.followers.gender : DATA.instagram.gender;
    const age = isTikTok ? DATA.tiktok.followers.age : DATA.instagram.age;
    const locations = isTikTok ? DATA.tiktok.followers.locations : DATA.instagram.locations;
    const growthChart = isTikTok ? DATA.tiktok.followers.growthChart : DATA.instagram.followers.growthChart;

    renderDonut("genderDonut", "genderLegend", gender, `${isTikTok ? "TikTok" : "Instagram"} gender split donut chart`);
    renderBarChart("ageChart", objToRows(age), false, false);
    renderBarChart("locationChart", objToRows(locations), true, true);
    renderGrowthChart("growthLine", growthChart);
    renderFollowersHeading(platform);
  }

  /* ============ AUDIENCE: PLATFORM TABS ============ */
  function initPlatformTabs() {
    const tabTikTok = document.getElementById("platformTikTok");
    const tabInstagram = document.getElementById("platformInstagram");

    tabTikTok.addEventListener("click", () => {
      if (tabTikTok.classList.contains("is-active")) return;
      tabTikTok.classList.add("is-active");
      tabTikTok.setAttribute("aria-selected", "true");
      tabInstagram.classList.remove("is-active");
      tabInstagram.setAttribute("aria-selected", "false");
      renderAudiencePanel("tiktok");
    });

    tabInstagram.addEventListener("click", () => {
      if (tabInstagram.classList.contains("is-active")) return;
      tabInstagram.classList.add("is-active");
      tabInstagram.setAttribute("aria-selected", "true");
      tabTikTok.classList.remove("is-active");
      tabTikTok.setAttribute("aria-selected", "false");
      renderAudiencePanel("instagram");
    });
  }

  /* ============ STATS ============ */
  function initStats() {
    document.getElementById("perfWindowLabel").textContent = DATA.period.label;

    document.getElementById("megaStatCount").dataset.target = DATA.headline.combinedViews;

    document.getElementById("headlineStrip").innerHTML = [
      { label: "Total followers", value: DATA.headline.totalFollowers },
      { label: "Combined interactions", value: DATA.headline.combinedInteractions },
      { label: "New followers, 60 days", value: DATA.headline.newFollowers60d }
    ].map((t) => `
      <div class="headline-tile">
        <span class="headline-value count-up" data-target="${t.value}">0</span>
        <span class="headline-label">${t.label}</span>
      </div>
    `).join("");

    const tk = DATA.tiktok.performance;
    const tiktokTiles = [
      { label: "TikTok post views", value: tk.postViews.value },
      { label: "TikTok likes", value: tk.likes.value },
      { label: "TikTok comments", value: tk.comments.value },
      { label: "TikTok shares", value: tk.shares.value }
    ];
    document.getElementById("tiktokStatGrid").innerHTML = tiktokTiles.map((t, i) => `
      <div class="stat-tile reveal reveal-left" style="transition-delay:${i * 70}ms">
        <span class="stat-value count-up" data-target="${t.value}">0</span>
        <span class="stat-label">${t.label}</span>
      </div>
    `).join("");

    const ig = DATA.instagram.performance;
    const instagramTiles = [
      { label: "Instagram views", value: ig.views },
      { label: "Instagram story views", value: ig.byContentType.Stories },
      { label: "Instagram interactions", value: ig.interactions },
      { label: "Instagram viewers reached", value: ig.viewersReached }
    ];
    document.getElementById("instagramStatGrid").innerHTML = instagramTiles.map((t, i) => `
      <div class="stat-tile reveal reveal-right" style="transition-delay:${i * 70}ms">
        <span class="stat-value count-up" data-target="${t.value}">0</span>
        <span class="stat-label">${t.label}</span>
      </div>
    `).join("");

    renderBarChart("trafficChart", [
      { label: "For You", pct: DATA.tiktok.traffic.forYou },
      { label: "Personal profile", pct: DATA.tiktok.traffic.personalProfile }
    ], true, false);

    renderBarChart("igTrafficChart", [
      { label: "Non followers", pct: ig.viewsFromNonFollowers },
      { label: "Followers", pct: ig.viewsFromFollowers }
    ], true, false);
  }

  /* ============ SHARED: video embed markup ============
     Used by both the "What I make" cards and the brand cards, so a card
     always reserves the same 9:16 slot whether or not a real video exists
     yet. Real URL: lazy-loads the TikTok embed once scrolled into view.
     No URL: a "video coming soon" placeholder fills the same space. */
  function embedWrapMarkup(url, poster, caption, extraClass) {
    if (!url) {
      return `<div class="work-embed-wrap${extraClass ? " " + extraClass : ""}"><div class="work-thumb-fallback">🎬 Video coming soon</div></div>`;
    }
    return `<div class="work-embed-wrap${extraClass ? " " + extraClass : ""}" data-lazy-embed data-tiktok-url="${url}" data-poster="${poster || ""}" data-caption="${caption || ""}"></div>`;
  }

  /* ============ SHARED: local video markup (real mp4, no TikTok chrome) ============
     Renders a plain HTML5 <video> — just the video, no likes/comments/share
     sidebar. Autoplays muted (the only autoplay browsers allow without a
     click) once scrolled into view, pauses when scrolled out, with small
     tap-to-pause and tap-to-unmute toggles since it starts silent. */
  function localVideoMarkup(src, extraClass) {
    return `<div class="work-embed-wrap${extraClass ? " " + extraClass : ""}">
      <video class="brand-video" muted loop playsinline preload="none" data-lazy-src="${src}"></video>
      <button class="video-play-toggle" type="button" aria-label="Pause video">⏸️</button>
      <button class="video-mute-toggle" type="button" aria-label="Unmute video">🔇</button>
      <div class="video-progress" role="slider" tabindex="0" aria-label="Seek video" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <div class="video-progress-fill"></div>
      </div>
    </div>`;
  }

  function wireLazyVideos(videos) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = video.dataset.lazySrc;
            video.load();
          }
          if (video.dataset.userPaused !== "1") video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.4 });

    videos.forEach((el) => observer.observe(el));
  }

  function wireVideoMuteToggles(root) {
    root.querySelectorAll(".video-mute-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const video = btn.closest(".work-embed-wrap").querySelector("video");
        if (!video) return;
        video.muted = !video.muted;
        btn.textContent = video.muted ? "🔇" : "🔊";
        btn.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
      });
    });
  }

  function wireVideoPlayToggles(root) {
    root.querySelectorAll(".work-embed-wrap").forEach((wrap) => {
      const video = wrap.querySelector("video");
      const btn = wrap.querySelector(".video-play-toggle");
      if (!video || !btn) return;

      video.addEventListener("play", () => {
        btn.textContent = "⏸️";
        btn.setAttribute("aria-label", "Pause video");
      });
      video.addEventListener("pause", () => {
        btn.textContent = "▶️";
        btn.setAttribute("aria-label", "Play video");
      });
      btn.addEventListener("click", () => {
        if (video.paused) {
          video.dataset.userPaused = "";
          video.play().catch(() => {});
        } else {
          video.dataset.userPaused = "1";
          video.pause();
        }
      });
    });
  }

  /* ---- draggable/clickable seek bar along the bottom of each video ---- */
  function wireVideoProgress(root) {
    root.querySelectorAll(".work-embed-wrap").forEach((wrap) => {
      const video = wrap.querySelector("video");
      const bar = wrap.querySelector(".video-progress");
      const fill = wrap.querySelector(".video-progress-fill");
      if (!video || !bar || !fill) return;

      const setProgress = (ratio) => {
        fill.style.width = ratio * 100 + "%";
        bar.setAttribute("aria-valuenow", Math.round(ratio * 100));
      };

      video.addEventListener("timeupdate", () => {
        if (!video.duration) return;
        setProgress(video.currentTime / video.duration);
      });

      const seekToEvent = (e) => {
        if (!video.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        video.currentTime = ratio * video.duration;
        setProgress(ratio);
      };

      bar.addEventListener("pointerdown", (e) => {
        bar.setPointerCapture(e.pointerId);
        seekToEvent(e);
      });
      bar.addEventListener("pointermove", (e) => {
        if (e.buttons === 1) seekToEvent(e);
      });
      bar.addEventListener("keydown", (e) => {
        if (!video.duration) return;
        if (e.key === "ArrowRight") video.currentTime = Math.min(video.currentTime + 5, video.duration);
        else if (e.key === "ArrowLeft") video.currentTime = Math.max(video.currentTime - 5, 0);
      });
    });
  }

  function fillEmbedWrapPosters(root) {
    root.querySelectorAll("[data-lazy-embed]").forEach((wrap) => {
      const url = wrap.dataset.tiktokUrl;
      const poster = wrap.dataset.poster;
      const caption = wrap.dataset.caption;
      wrap.innerHTML = `
        <a class="work-thumb-link" href="${url}" target="_blank" rel="noopener" aria-label="Watch on TikTok: ${caption}">
          <img src="${poster}" alt="" loading="lazy" onerror="this.parentElement.outerHTML='<div class=&quot;work-thumb-fallback&quot;>🎬 Tap to watch on TikTok</div>'">
        </a>
      `;
    });
  }

  /* ============ WHAT I MAKE (pillars + videos) ============ */
  function initWork() {
    const grid = document.getElementById("workGrid");
    grid.innerHTML = DATA.content.map((w, i) => `
      <div class="work-card reveal reveal-left" style="transition-delay:${i * 90}ms">
        <div class="work-card-head">
          <h3 class="work-title">${w.title}</h3>
        </div>
        ${w.video ? localVideoMarkup(w.video) : embedWrapMarkup(w.url, w.poster, w.caption)}
        <p class="work-caption">${w.caption}</p>
      </div>
    `).join("");

    fillEmbedWrapPosters(grid);
    wireLazyEmbeds(grid.querySelectorAll("[data-lazy-embed]"));
    wireLazyVideos(grid.querySelectorAll("video[data-lazy-src]"));
    wireVideoMuteToggles(grid);
    wireVideoPlayToggles(grid);
    wireVideoProgress(grid);
  }

  /* ============ BRANDS ============ */
  function initBrands() {
    document.getElementById("brandGrid").innerHTML = DATA.brands.map((b, i) => `
      <div class="brand-tile reveal reveal-left" style="transition-delay:${i * 90}ms">
        <div class="brand-tile-head">
          <img src="${b.logo}" alt="${b.name} logo" loading="lazy"
            onerror="this.closest('.brand-tile').classList.add('logo-missing'); this.remove();">
          <span class="brand-fallback-name" style="display:none">${b.name}</span>
        </div>
        <div class="brand-tile-body">
          ${b.video ? localVideoMarkup(b.video, "brand-embed-wrap") : embedWrapMarkup(b.videoUrl, b.poster, `Video with ${b.name}`, "brand-embed-wrap")}
          ${b.website ? `<a class="brand-website-link" href="${b.website}" target="_blank" rel="noopener">Visit website ↗</a>` : ""}
        </div>
      </div>
    `).join("");

    const brandGrid = document.getElementById("brandGrid");
    wireLazyVideos(brandGrid.querySelectorAll("video[data-lazy-src]"));
    wireVideoMuteToggles(brandGrid);
    wireVideoPlayToggles(brandGrid);
    wireVideoProgress(brandGrid);
    brandGrid.querySelectorAll(".brand-tile").forEach((tile) => {
      const img = tile.querySelector("img");
      if (img) {
        img.addEventListener("error", () => {
          tile.classList.add("logo-missing");
          const fb = tile.querySelector(".brand-fallback-name");
          if (fb) fb.style.display = "block";
          const hint = document.createElement("span");
          hint.className = "brand-fallback-hint";
          hint.textContent = "logo pending";
          tile.querySelector(".brand-tile-head").appendChild(hint);
        }, { once: true });
      }
    });

    fillEmbedWrapPosters(brandGrid);
    wireLazyEmbeds(brandGrid.querySelectorAll("[data-lazy-embed]"));
  }

  /* ============ SHARED: lazy TikTok embed loader ============ */
  function wireLazyEmbeds(wraps) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const wrap = entry.target;
        const url = wrap.dataset.tiktokUrl;
        if (!url || url.includes("0000000000000000")) return; // placeholder URL, skip real embed
        const videoId = (url.match(/\/video\/(\d+)/) || [])[1] || "";
        wrap.classList.add("is-embedded");
        wrap.innerHTML = `<blockquote class="tiktok-embed" cite="${url}" data-video-id="${videoId}">
          <a href="${url}" target="_blank" rel="noopener">${url}</a>
        </blockquote>`;
        loadTikTokScript();
        lazyObserver.unobserve(wrap);
      });
    }, { rootMargin: "200px" });

    wraps.forEach((el) => lazyObserver.observe(el));
  }

  let tiktokScriptLoaded = false;
  function loadTikTokScript() {
    if (tiktokScriptLoaded) {
      if (window.tiktokEmbed && window.tiktokEmbed.lib) window.tiktokEmbed.lib.render();
      return;
    }
    tiktokScriptLoaded = true;
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }

  /* ============ COUNT UP ============ */
  function initCountUpFor(els) {
    if (prefersReducedMotion) {
      els.forEach((el) => {
        const target = parseFloat(el.dataset.target);
        el.textContent = fmtCompact(target) + (el.dataset.suffix || "");
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.done) return;
        el.dataset.done = "1";
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(target * eased);
          el.textContent = fmtCompact(value) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = fmtCompact(target) + suffix;
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    els.forEach((el) => observer.observe(el));
  }

  function initCountUp() {
    initCountUpFor(document.querySelectorAll(".count-up"));
  }

  /* ============ SCROLL REVEAL ============ */
  function initReveal() {
    const revealEls = document.querySelectorAll(".reveal");

    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      animateBars(document.getElementById("ageChart"));
      animateBars(document.getElementById("locationChart"));
      animateBars(document.getElementById("trafficChart"));
      animateBars(document.getElementById("igTrafficChart"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");

        // trigger any bar-chart or trend-line inside this revealed card
        const barChart = el.querySelector(".bar-chart");
        if (barChart) animateBars(barChart);
        const trendLine = el.querySelector(".trend-line");
        if (trendLine) animateTrendLine(trendLine.id);

        observer.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ============ COPY EMAIL ============ */
  function initCopyEmail() {
    const btn = document.getElementById("copyBtn");
    const originalLabel = btn.textContent;
    let resetTimer = null;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(DATA.email);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = DATA.email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      btn.textContent = "Copied";
      btn.classList.add("is-copied");
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        btn.textContent = originalLabel;
        btn.classList.remove("is-copied");
      }, 2000);
    });
  }

  /* ============ INIT ============ */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initScrollspy();
    initLinks();
    initAbout();
    renderAudiencePanel("tiktok");
    initPlatformTabs();
    initStats();
    initBrands();
    initWork();
    initCopyEmail();
    initReveal();
    initCountUp();
  });
})();
