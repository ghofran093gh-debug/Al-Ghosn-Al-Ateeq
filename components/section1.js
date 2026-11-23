(() => {
  "use strict";

  const section = document.querySelector(".s2-section");
  if (!section) return;

  const STORAGE_KEY = "ghosn-alateeq-language";
  const FAVORITES_KEY = "ghosn-alateeq-section2-favorites";

  const CATEGORIES = [
    {
      id: "curtain",
      href: "#curtain",
      images: [
        "../public/Curtain/1d37ed1b-80f8-4e9a-9466-b3170ae056f0.webp",
        "../public/Curtain/4651f641-a851-4a09-bda4-7fb39ccbf850.webp"
      ]
    },
    {
      id: "sofas",
      href: "#sofas",
      images: [
        "../public/sofas/030b281a-bc01-495b-934f-d8c0a02dc490.webp",
        "../public/sofas/37e1fc89-5ae5-4008-9747-6a7a585e4e7e.webp"
      ]
    },
    {
      id: "tables",
      href: "#tables",
      images: [
        "../public/Tables/bi.jpeg",
        "../public/Tables/icir.jpeg"
      ]
    },
    {
      id: "painting",
      href: "#painting",
      images: [
        "../public/Painting/dhgf.webp",
        "../public/Painting/fghj.webp"
      ]
    },
    {
      id: "min",
      href: "#min",
      images: [
        "../public/min/gh.jpeg",
        "../public/min/images (1).jpg"
      ]
    }
  ];

  const TRANSLATIONS = {
    ar: {
      ariaAdd: "إضافة إلى المفضلة",
      ariaRemove: "إزالة من المفضلة",
      eyebrow: "فن التفاصيل",
      titleLine1: "نصنع الجمال",
      titleLine2: "على ذوقك",
      description:
        "لأن لكل مساحة حكاية، نصمم التفاصيل بعناية لتعبّر عن ذوقك وتمنح منزلك شخصية لا تشبه سواه.",
      galleryHeading: "اكتشف مجموعاتنا",
      closeImage: "إغلاق الصورة",
      categories: {
        curtain: "الستائر",
        sofas: "الكنب",
        tables: "الطاولات",
        painting: "اللوحات",
        min: "تشكيلة مختارة"
      }
    },

    en: {
      ariaAdd: "Add to favorites",
      ariaRemove: "Remove from favorites",
      eyebrow: "The Art of Detail",
      titleLine1: "We create beauty",
      titleLine2: "to your taste",
      description:
        "Because every space has a story, we design the details with care to express your taste and give your home a character like no other.",
      galleryHeading: "Discover Our Collections",
      closeImage: "Close image",
      categories: {
        curtain: "Curtains",
        sofas: "Sofas",
        tables: "Tables",
        painting: "Paintings",
        min: "Selected Collection"
      }
    }
  };

  const clamp = (value) => Math.max(0, Math.min(1, value));

  const VIEWBOX_WIDTH = 1000;
  const VIEWBOX_HEIGHT = 2200;
  const HEAD_AT = 0.62;

  const gallery = section.querySelector(".s2-gallery");
  const intro = section.querySelector(".s2-intro");
  const loopImage = section.querySelector(".s2-loop-image");
  const svgElement = section.querySelector(".s2-motion-line");

  const firstBase = section.querySelector(".s2-line-base--first");
  const secondBase = section.querySelector(".s2-line-base--second");
  const firstLine = section.querySelector(".s2-line-progress--first");
  const secondLine = section.querySelector(".s2-line-progress--second");

  const lightbox = section.querySelector(".s2-lightbox");
  const lightboxImage = section.querySelector(".s2-lightbox__image");
  const lightboxClose = section.querySelector(".s2-lightbox__close");

  let selectedImage = null;
  let imageSizes = {};
  let favorites = loadFavorites();

  function getLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "ar" || saved === "en") {
      return saved;
    }

    return document.documentElement.dir === "ltr" ? "en" : "ar";
  }

  function loadFavorites() {
    try {
      const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  function isFavorite(category) {
    return category.images.every((src) =>
      favorites.some((item) => item.src === src)
    );
  }

  function createCard(category, index, labels) {
    const title = labels.categories[category.id];
    const favorite = isFavorite(category);

    const item = document.createElement("div");
    item.className = `s2-gallery__item s2-gallery__item--${index + 1}`;

    const card = document.createElement("article");
    card.className = "s2-card";

    const visual = document.createElement("div");
    visual.className = "s2-card__visual";

    const mainButton = createImageButton(
      category.images[0],
      title,
      "s2-card__main-image"
    );

    const secondButton = createImageButton(
      category.images[1],
      title,
      "s2-card__second-image"
    );

    const heart = document.createElement("button");
    heart.type = "button";
    heart.className = "s2-card__heart";
    heart.setAttribute("aria-pressed", String(favorite));
    heart.setAttribute(
      "aria-label",
      favorite ? labels.ariaRemove : labels.ariaAdd
    );

    if (favorite) heart.classList.add("is-favorite");

    heart.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>
      </svg>
    `;

    heart.addEventListener("click", () => {
      toggleFavorite(category);
      updateFavoriteButton(heart, category);
    });

    const label = document.createElement("a");
    label.className = "s2-card__label";
    label.href = category.href;

    const labelText = document.createElement("span");
    labelText.textContent = title;

    const arrow = document.createElement("span");
    arrow.className = "s2-card__arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";

    label.append(labelText, arrow);
    visual.append(mainButton, secondButton, heart);
    card.append(visual, label);
    item.appendChild(card);

    return item;
  }

  function createImageButton(src, title, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.setAttribute("aria-label", title);

    const image = document.createElement("img");
    image.src = src;
    image.alt = title;
    image.loading = "lazy";

    image.addEventListener("load", () => {
      imageSizes[src] = {
        width: image.naturalWidth,
        height: image.naturalHeight
      };
    });

    button.appendChild(image);

    button.addEventListener("click", () => {
      openLightbox(src, title);
    });

    return button;
  }

  function updateFavoriteButton(button, category) {
    const favorite = isFavorite(category);
    const labels = TRANSLATIONS[getLanguage()];

    button.classList.toggle("is-favorite", favorite);
    button.setAttribute("aria-pressed", String(favorite));
    button.setAttribute(
      "aria-label",
      favorite ? labels.ariaRemove : labels.ariaAdd
    );
  }

  function toggleFavorite(category) {
    const sources = category.images;
    const allSaved = sources.every((src) =>
      favorites.some((item) => item.src === src)
    );

    if (allSaved) {
      favorites = favorites.filter(
        (item) => !sources.includes(item.src)
      );
    } else {
      favorites = [
        ...favorites.filter((item) => !sources.includes(item.src)),
        ...sources.map((src) => ({
          src,
          width: imageSizes[src]?.width || 1,
          height: imageSizes[src]?.height || 1,
          name: TRANSLATIONS[getLanguage()].categories[category.id],
          text: TRANSLATIONS[getLanguage()].categories[category.id]
        }))
      ];
    }

    saveFavorites();
  }

  function renderLanguage() {
    const language = getLanguage();
    const labels = TRANSLATIONS[language];
    const isArabic = language === "ar";

    document.documentElement.lang = language;

    const newDirection = isArabic ? "rtl" : "ltr";

    if (document.documentElement.dir !== newDirection) {
      document.documentElement.dir = newDirection;
    }

    section.querySelector(".s2-intro__eyebrow").textContent =
      labels.eyebrow;

    section.querySelector(".s2-intro__title-line1").textContent =
      labels.titleLine1;

    section.querySelector(".s2-intro__title-line2").textContent =
      labels.titleLine2;

    section.querySelector(".s2-intro__description").textContent =
      labels.description;

    section.querySelector(".s2-gallery-heading__title").textContent =
      labels.galleryHeading;

    lightboxClose.setAttribute("aria-label", labels.closeImage);

    gallery.innerHTML = "";

    CATEGORIES.forEach((category, index) => {
      gallery.appendChild(createCard(category, index, labels));
    });

    if (selectedImage) {
      lightbox.setAttribute("aria-label", selectedImage.title);
    }
  }

  function openLightbox(src, title) {
    selectedImage = { src, title };

    lightboxImage.src = src;
    lightboxImage.alt = title;
    lightbox.hidden = false;

    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (lightbox.hidden) return;

    lightbox.hidden = true;
    lightboxImage.src = "";
    selectedImage = null;

    document.body.style.overflow = "";
  }

  lightbox.addEventListener("click", (event) => {
    if (
      event.target === lightbox ||
      event.target === lightboxClose
    ) {
      closeLightbox();
    }
  });

  lightboxImage.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  lightboxClose.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  // اللغة تتحدث أيضاً إذا غيّر ملف آخر اتجاه الصفحة.
  const directionObserver = new MutationObserver(() => {
    renderLanguage();
  });

  directionObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir"]
  });

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      renderLanguage();
    }
  });

  renderLanguage();

  // ==========================================
  // حركة الخط الأخضر مع التمرير
  // ==========================================

  let SAMPLES = 1400;
  let smoothing = 90;
  let geometry = null;
  let targetIndex = 0;
  let shownIndex = 0;
  let lineFrame = null;
  let lastLineTime = 0;
  let frame = null;
  let mobileLoop = null;

  const mobileQuery = window.matchMedia("(max-width: 600px)");

  const rad = (deg) => (deg * Math.PI) / 180;

  const buildMobilePaths = (W) => {
    const items = Array.from(
      section.querySelectorAll(".s2-gallery__item")
    );

    if (!gallery || !intro || items.length < 2) return null;

    const f = (n) => n.toFixed(2);
    const half =
      (parseFloat(getComputedStyle(firstLine).strokeWidth) || 12) / 2;

    const R = loopImage.offsetWidth / 2;
    const LOOP_GAP = 40;

    const boxes = items.map((el) => {
      const l = gallery.offsetLeft + el.offsetLeft;
      const t = gallery.offsetTop + el.offsetTop;

      return {
        l,
        r: l + el.offsetWidth,
        t,
        b: t + el.offsetHeight
      };
    });

    const lanes = boxes.map((box) => {
      const side = W - box.r >= box.l ? 1 : -1;

      return {
        side,
        x: side > 0 ? (box.r + W) / 2 : box.l / 2
      };
    });

    const m = lanes[0].side;
    const edge = half + 6;
    const introX = m > 0 ? W - edge : edge;

    const introPadding =
      parseFloat(getComputedStyle(intro).paddingBottom) || 0;

    const textBottom =
      intro.offsetTop + intro.offsetHeight - introPadding;

    const cx = W / 2;
    const cy = boxes[0].b + LOOP_GAP + R;

    section.style.setProperty("--s2-loop-left", `${f(cx)}px`);
    section.style.setProperty("--s2-loop-top", `${f(cy)}px`);

    mobileLoop = { cy, R };

    const hookY = cy + 0.707 * R;

    const hookStart = [cx + m * 1.292 * R, hookY];
    const hookEnter = [cx + m * R, cy];
    const hookExit = [cx - m * 0.708 * R, hookY];

    const t1 = boxes[0].t;
    const driftFrom = Math.min(textBottom + 20, t1 - 30);
    const driftTo = t1 + 40;
    const driftMid = (driftTo - driftFrom) * 0.5;
    const swoopFrom = boxes[0].b - 10;

    const first = `
      M ${f(introX)} -10
      L ${f(introX)} ${f(driftFrom)}
      C ${f(introX)} ${f(driftFrom + driftMid)},
        ${f(lanes[0].x)} ${f(driftTo - driftMid)},
        ${f(lanes[0].x)} ${f(driftTo)}
      L ${f(lanes[0].x)} ${f(swoopFrom)}
      C ${f(lanes[0].x)} ${f(hookY + 80)},
        ${f(hookStart[0])} ${f(hookY + 80)},
        ${f(hookStart[0])} ${f(hookStart[1])}
      A ${f(R)} ${f(R)} 0 0 ${m > 0 ? 0 : 1}
        ${f(hookEnter[0])} ${f(hookEnter[1])}
    `;

    const reach = Math.max(
      boxes[1].t - 14,
      hookExit[1] + 80
    );

    const reachK = (reach - hookExit[1]) * 0.55;

    let second = `
      M ${f(hookExit[0])} ${f(hookExit[1])}
      C ${f(hookExit[0])} ${f(hookExit[1] + reachK)},
        ${f(lanes[1].x)} ${f(reach - reachK)},
        ${f(lanes[1].x)} ${f(reach)}
    `;

    for (let i = 1; i < boxes.length; i += 1) {
      const lane = lanes[i];
      const down = boxes[i].b + 4;

      second += ` L ${f(lane.x)} ${f(down)}`;

      if (i < boxes.length - 1) {
        const next = lanes[i + 1];
        const to = boxes[i + 1].t - 14;
        const k = (to - down) * 0.55;

        second += `
          C ${f(lane.x)} ${f(down + k)},
            ${f(next.x)} ${f(to - k)},
            ${f(next.x)} ${f(to)}
        `;
      } else {
        const out = lane.side > 0 ? W + 40 : -40;

        second += `
          C ${f(lane.x)} ${f(down + 50)},
            ${f(lane.x + lane.side * 20)} ${f(down + 62)},
            ${f(out)} ${f(down + 62)}
        `;
      }
    }

    return { first, second };
  };

  function buildGeometry() {
    const sectionRect = section.getBoundingClientRect();
    const mobile = mobileQuery.matches;

    const vbW = mobile ? sectionRect.width : VIEWBOX_WIDTH;
    const vbH = mobile ? sectionRect.height : VIEWBOX_HEIGHT;

    const sx = sectionRect.width / vbW;
    const sy = sectionRect.height / vbH;

    if (!sx || !sy || !loopImage) return;

    svgElement.setAttribute("viewBox", `0 0 ${vbW} ${vbH}`);

    SAMPLES = mobile ? 900 : 1400;
    smoothing = mobile ? 130 : 90;

    let mobilePaths = null;

    if (mobile) {
      mobilePaths = buildMobilePaths(sectionRect.width);
    } else {
      section.style.removeProperty("--s2-loop-left");
      section.style.removeProperty("--s2-loop-top");
      mobileLoop = null;
    }

    const imageStyle = getComputedStyle(loopImage);

    const cx = parseFloat(imageStyle.left);
    const cy = parseFloat(imageStyle.top);

    const rho = loopImage.offsetWidth / 2;
    const R = rho;

    const at = (deg) => [
      R * Math.cos(rad(deg)),
      R * Math.sin(rad(deg))
    ];

    const enter = at(225);
    const exit = at(360);
    const middle = at(292.5);

    const chord = Math.hypot(
      exit[0] - enter[0],
      exit[1] - enter[1]
    );

    const h = Math.sqrt(
      Math.max(0, rho * rho - (chord / 2) ** 2)
    );

    const nx = -(exit[1] - enter[1]) / chord;
    const ny = (exit[0] - enter[0]) / chord;

    const mx = (enter[0] + exit[0]) / 2;
    const my = (enter[1] + exit[1]) / 2;

    let v = [mx + nx * h, my + ny * h];
    const w = [mx - nx * h, my - ny * h];

    if (
      Math.hypot(middle[0] - w[0], middle[1] - w[1]) <
      Math.hypot(middle[0] - v[0], middle[1] - v[1])
    ) {
      v = w;
    }

    const arcCenter = [cx - v[0], cy - v[1]];
    const start = [arcCenter[0] - R, arcCenter[1]];

    const enterPoint = [
      arcCenter[0] + enter[0],
      arcCenter[1] + enter[1]
    ];

    const exitPoint = [
      arcCenter[0] + exit[0],
      arcCenter[1] + exit[1]
    ];

    const u = ([px, py]) => [px / sx, py / sy];

    const [startX, startY] = u(start);
    const [enterX, enterY] = u(enterPoint);
    const [exitX, exitY] = u(exitPoint);

    const arcRx = R / sx;
    const arcRy = R / sy;

    const fix = (n) => n.toFixed(2);

    const first = `
      M 920 0
      C 900 230, 760 340, 520 350
      C 280 360, 100 260, 100 470
      C 100 650,
        ${fix(startX)} ${fix(startY + 160 / sy)},
        ${fix(startX)} ${fix(startY)}
      A ${fix(arcRx)} ${fix(arcRy)} 0 0 1
        ${fix(enterX)} ${fix(enterY)}
    `;

    const second = `
      M ${fix(exitX)} ${fix(exitY)}
      C ${fix(exitX)} ${fix(exitY + 140 / sy)},
        470 720, 420 900
      C 350 1160, 130 1250, 210 1510
      C 270 1720, 650 1690, 750 1900
      C 820 2040, 690 2150, 570 2200
    `;

    firstBase.setAttribute(
      "d",
      mobilePaths ? mobilePaths.first : first
    );

    secondBase.setAttribute(
      "d",
      mobilePaths ? mobilePaths.second : second
    );

    const sample = (path) => {
      const length = path.getTotalLength();
      const xs = [];
      const ys = [];

      for (let i = 0; i <= SAMPLES; i += 1) {
        const point = path.getPointAtLength(
          (length * i) / SAMPLES
        );

        xs.push(point.x);
        ys.push(point.y);
      }

      return { xs, ys };
    };

    const one = sample(firstBase);
    const two = sample(secondBase);

    const xs = one.xs.concat(two.xs);
    const ys = one.ys.concat(two.ys);

    const runMax = new Float64Array(xs.length);
    let highest = -Infinity;

    for (let i = 0; i < xs.length; i += 1) {
      highest = Math.max(highest, ys[i] * sy);
      runMax[i] = highest;
    }

    geometry = {
      xs,
      ys,
      split: SAMPLES + 1,
      runMax
    };
  }

  function partialPath(from, to, count) {
    if (!geometry || count <= 0) return "";

    const { xs, ys } = geometry;
    const whole = Math.floor(count);
    const last = from + Math.min(whole, to - from);

    let d = `M ${xs[from].toFixed(2)} ${ys[from].toFixed(2)}`;

    for (let i = from + 1; i <= last; i += 1) {
      d += ` L ${xs[i].toFixed(2)} ${ys[i].toFixed(2)}`;
    }

    const fraction = count - whole;

    if (fraction > 0 && last < to) {
      const x =
        xs[last] + (xs[last + 1] - xs[last]) * fraction;

      const y =
        ys[last] + (ys[last + 1] - ys[last]) * fraction;

      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }

    return d;
  }

  function drawLines(index) {
    if (!geometry) return;

    const { split } = geometry;

    const firstCount = Math.min(index, split - 1);
    const secondCount = index - split;

    firstLine.setAttribute(
      "d",
      partialPath(0, split - 1, firstCount)
    );

    secondLine.setAttribute(
      "d",
      partialPath(split, geometry.xs.length - 1, secondCount)
    );
  }

  function indexForHead(headY) {
    if (!geometry) return 0;

    const { runMax } = geometry;

    if (headY <= runMax[0]) return 0;

    let low = 0;
    let high = runMax.length - 1;

    while (low < high) {
      const mid = (low + high + 1) >> 1;

      if (runMax[mid] <= headY) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }

    if (low >= runMax.length - 1) return low;

    const span = runMax[low + 1] - runMax[low];

    const fraction = span > 0
      ? (headY - runMax[low]) / span
      : 0;

    return low + clamp(fraction);
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function lineTick(time) {
    const dt = lastLineTime
      ? Math.min(64, time - lastLineTime)
      : 16;

    lastLineTime = time;

    shownIndex +=
      (targetIndex - shownIndex) *
      (1 - Math.exp(-dt / smoothing));

    if (
      reduceMotion ||
      Math.abs(targetIndex - shownIndex) < 0.05
    ) {
      shownIndex = targetIndex;
    }

    drawLines(shownIndex);

    if (shownIndex !== targetIndex) {
      lineFrame = requestAnimationFrame(lineTick);
    } else {
      lineFrame = null;
      lastLineTime = 0;
    }
  }

  function kickLine() {
    if (!lineFrame) {
      lineFrame = requestAnimationFrame(lineTick);
    }
  }

  function updateAnimations() {
    if (frame) cancelAnimationFrame(frame);

    frame = requestAnimationFrame(() => {
      const viewportHeight = window.innerHeight;
      const sectionRect = section.getBoundingClientRect();

      const progress = clamp(
        (viewportHeight - sectionRect.top) /
        (sectionRect.height + viewportHeight)
      );

      const headY = viewportHeight * HEAD_AT - sectionRect.top;

      targetIndex = indexForHead(headY);
      kickLine();

      const imageProgress = mobileLoop
        ? clamp(
            (headY - (mobileLoop.cy - mobileLoop.R * 1.4)) /
            (mobileLoop.R * 2)
          )
        : clamp((progress - 0.19) / 0.08);

      loopImage.style.setProperty(
        "--loop-image-progress",
        imageProgress
      );

      if (intro) {
        const introRect = intro.getBoundingClientRect();

        const introProgress = clamp(
          (viewportHeight * 0.85 - introRect.top) /
          (viewportHeight * 0.55)
        );

        intro.style.setProperty(
          "--intro-progress",
          introProgress
        );
      }

      const cards = section.querySelectorAll(".s2-gallery__item");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();

        const cardProgress = clamp(
          (viewportHeight * 0.88 - rect.top) /
          (viewportHeight * 0.7)
        );

        card.style.setProperty(
          "--card-progress",
          cardProgress
        );
      });
    });
  }

  function relayout() {
    buildGeometry();
    updateAnimations();
  }

  relayout();
  shownIndex = targetIndex;
  drawLines(shownIndex);

  window.addEventListener("scroll", updateAnimations, {
    passive: true
  });

  window.addEventListener("resize", relayout);
  window.addEventListener("load", relayout);

  const observer = typeof ResizeObserver !== "undefined"
    ? new ResizeObserver(relayout)
    : null;

  observer?.observe(section);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(relayout);
  }

})();