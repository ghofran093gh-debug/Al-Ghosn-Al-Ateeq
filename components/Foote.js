/* =========================================
   FOOTER - VANILLA JAVASCRIPT
   No React / No JSX
========================================= */

(() => {
  "use strict";

  const SOCIAL_LINKS = {
    snapchat: "https://www.snapchat.com/add/lgsnltyq",
    whatsapp: "https://wa.me/966559914470",
  };

  const MAP_URL =
    "https://www.google.com/maps?q=20.023868,41.4780639&output=embed";

  const MAP_EXTERNAL_URL =
    "https://www.google.com/maps/search/?api=1&query=20.023868,41.4780639";

  const STORAGE_KEY = "ghosn-alateeq-language";

  /* =========================================
     TRANSLATIONS
  ========================================= */

  const translations = {
    ar: {
      dir: "rtl",

      section6: {
        brand: "الغصن العتيق",
        title: "اكتشفوا عالمنا",
        intro: "تفاصيل مختارة بعناية لتضيف لمنازلكم لمسة من الأناقة والجمال.",
        discover: "اكتشف المزيد",
        arrow: "←",

        categories: {
          dining: {
            name: "طاولات الطعام",
            description: "تصاميم تجمع بين الفخامة والعملية.",
          },

          paintings: {
            name: "اللوحات الفنية",
            description: "لمسات فنية تمنح المكان شخصية مميزة.",
          },

          curtains: {
            name: "الستائر",
            description: "تفاصيل أنيقة تكمل جمال المساحات.",
          },
        },
      },

      footer: {
        navLabel: "روابط الموقع",
        navHeading: "روابط سريعة",

        links: {
          home: "الرئيسية",
          furniture: "المفروشات",
          dining: "طاولات الطعام",
          curtains: "الستائر",
          favorites: "المفضلة",
        },

        contactHeading: "تواصل معنا",
        contactIntro: "يسعدنا تواصلكم معنا للإجابة عن استفساراتكم.",
        whatsapp: "تواصل عبر واتساب",
        snapchat: "سناب شات",

        hoursHeading: "ساعات العمل",
        open: "مفتوح الآن",
        closed: "مغلق الآن",
        morning: "الفترة الصباحية: 9:00 صباحاً – 12:00 ظهراً",
        evening: "الفترة المسائية: 4:00 مساءً – 11:00 مساءً",

        mapHeading: "موقعنا",
        mapDescription: "يسعدنا زيارتكم والتعرف على مجموعتنا.",
        mapTitle: "موقع الغصن العتيق على الخريطة",
        mapLink: "عرض الموقع على خرائط Google",

        rights: (year) => `© ${year} الغصن العتيق. جميع الحقوق محفوظة.`,
        note: "صُمم بعناية واهتمام بالتفاصيل.",
      },
    },

    en: {
      dir: "ltr",

      section6: {
        brand: "AL GHOSN ALATEEQ",
        title: "Discover Our World",
        intro: "Carefully selected details to bring elegance and beauty into your home.",
        discover: "Discover More",
        arrow: "→",

        categories: {
          dining: {
            name: "Dining Tables",
            description: "Designs that combine elegance and functionality.",
          },

          paintings: {
            name: "Artworks",
            description: "Artistic touches that give every space a unique character.",
          },

          curtains: {
            name: "Curtains",
            description: "Elegant details that complete the beauty of your space.",
          },
        },
      },

      footer: {
        navLabel: "Website navigation",
        navHeading: "Quick Links",

        links: {
          home: "Home",
          furniture: "Furniture",
          dining: "Dining Tables",
          curtains: "Curtains",
          favorites: "Favorites",
        },

        contactHeading: "Contact Us",
        contactIntro: "We would be delighted to answer your questions.",
        whatsapp: "Contact us on WhatsApp",
        snapchat: "Snapchat",

        hoursHeading: "Opening Hours",
        open: "Open Now",
        closed: "Closed Now",
        morning: "Morning: 9:00 AM – 12:00 PM",
        evening: "Evening: 4:00 PM – 11:00 PM",

        mapHeading: "Our Location",
        mapDescription: "We look forward to welcoming you.",
        mapTitle: "Al Ghosn Alateeq location on Google Maps",
        mapLink: "View on Google Maps",

        rights: (year) => `© ${year} Al Ghosn Alateeq. All rights reserved.`,
        note: "Designed with care and attention to detail.",
      },
    },
  };

  /* =========================================
     CATEGORY DATA
  ========================================= */

  const categories = [
    {
      id: "dining",
      image: "/Tables/bi.jpeg",
    },
    {
      id: "paintings",
      image: "/Painting/Golden%20Blaze%20Horse%20Portrait.png",
    },
    {
      id: "curtains",
      image: "/Curtain/b7c58f0c-0018-490d-bb34-6aeeb72931bd.webp",
    },
  ];

  /* =========================================
     SAUDI OPENING HOURS
  ========================================= */

  function getSaudiTime() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Riyadh",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());

    const hour = Number(
      parts.find((part) => part.type === "hour").value
    );

    const minute = Number(
      parts.find((part) => part.type === "minute").value
    );

    return hour * 60 + minute;
  }

  function getOpeningStatus() {
    const time = getSaudiTime();

    const morningOpen = time >= 9 * 60 && time < 12 * 60;
    const eveningOpen = time >= 16 * 60 && time < 23 * 60;

    return morningOpen || eveningOpen;
  }

  /* =========================================
     HTML HELPERS
  ========================================= */

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[character];
    });
  }

  function getCurrentLanguage() {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    return savedLanguage === "en" ? "en" : "ar";
  }

  /* =========================================
     BUILD SHOWCASE CARDS
  ========================================= */

  function createCards(sectionText) {
    return categories
      .map((category) => {
        const text = sectionText.categories[category.id];

        return `
          <a
            class="section6__card"
            href="#${category.id}"
            data-category="${category.id}"
          >
            <div class="section6__card-inner">

              <div class="section6__image-wrapper">
                <img
                  src="${category.image}"
                  alt="${escapeHTML(text.name)}"
                  class="section6__image"
                  loading="lazy"
                />

                <div class="section6__image-overlay"></div>
              </div>

              <div class="section6__card-content">
                <h3>${escapeHTML(text.name)}</h3>

                <span class="section6__underline"></span>

                <p>${escapeHTML(text.description)}</p>

                <span class="section6__link">
                  ${escapeHTML(sectionText.discover)}
                  <span>${escapeHTML(sectionText.arrow)}</span>
                </span>
              </div>

            </div>
          </a>
        `;
      })
      .join("");
  }

  /* =========================================
     BUILD FOOTER
  ========================================= */

  function createFooter(language) {
    const copy = translations[language];
    const t = copy.footer;
    const sectionText = copy.section6;

    const year = new Date().getFullYear();

    return `
      <div class="footer-experience" dir="${copy.dir}">

        <section class="section6 footer-showcase">

          <div class="section6__content">

            <div class="section6__heading">
              <span>${escapeHTML(sectionText.brand)}</span>

              <h2>${escapeHTML(sectionText.title)}</h2>

              <p>${escapeHTML(sectionText.intro)}</p>
            </div>

            <div class="section6__cards">
              ${createCards(sectionText)}
            </div>

          </div>

        </section>

        <footer class="site-footer" id="contact" dir="${copy.dir}">

          <div class="site-footer__inner">

            <div class="site-footer__columns">

              <!-- QUICK LINKS -->
              <nav
                class="site-footer__nav"
                aria-label="${escapeHTML(t.navLabel)}"
              >
                <h3 class="site-footer__heading">
                  ${escapeHTML(t.navHeading)}
                </h3>

                <a href="#home">${escapeHTML(t.links.home)}</a>
                <a href="#sofas">${escapeHTML(t.links.furniture)}</a>
                <a href="#dining">${escapeHTML(t.links.dining)}</a>
                <a href="#curtains">${escapeHTML(t.links.curtains)}</a>
                <a href="#favorites">${escapeHTML(t.links.favorites)}</a>
              </nav>

              <!-- CONTACT -->
              <section class="site-footer__contact">

                <h3 class="site-footer__heading">
                  ${escapeHTML(t.contactHeading)}
                </h3>

                <p class="site-footer__contact-intro">
                  ${escapeHTML(t.contactIntro)}
                </p>

                <a
                  class="site-footer__phone"
                  href="${SOCIAL_LINKS.whatsapp}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="site-footer__contact-icon">☎</span>
                  <span dir="ltr">+966 55 991 4470</span>
                </a>

                <a
                  class="site-footer__whatsapp"
                  href="${SOCIAL_LINKS.whatsapp}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span aria-hidden="true">◉</span>
                  ${escapeHTML(t.whatsapp)}
                  <span class="site-footer__arrow">↗</span>
                </a>

                <div class="site-footer__socials">

                  <a
                    href="${SOCIAL_LINKS.snapchat}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="${escapeHTML(t.snapchat)}"
                    title="${escapeHTML(t.snapchat)}"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.2c-3.1 0-5 2.2-5 5.4 0 1.1.2 2.1.1 2.8-.1.7-.7 1.2-1.7 1.6-.6.2-.9.6-.7 1 .2.5 1.1.7 1.8.9.6.2.8.6.7 1.1-.2.7-1.1 1.1-2.1 1.3-.7.2-.9.6-.5 1 .5.5 1.7.4 2.5.8.7.3.8 1 1.7 1.4.8.4 1.8.2 3.2.2s2.4.2 3.2-.2c.9-.4 1-1.1 1.7-1.4.8-.4 2-.3 2.5-.8.4-.4.2-.8-.5-1-1-.2-1.9-.6-2.1-1.3-.1-.5.1-.9.7-1.1.7-.2 1.6-.4 1.8-.9.2-.4-.1-.8-.7-1-1-.4-1.6-.9-1.7-1.6-.1-.7.1-1.7.1-2.8 0-3.2-1.9-5.4-5-5.4Z"/>
                    </svg>
                  </a>

                </div>

                <!-- OPENING HOURS -->
                <div class="site-footer__hours">

                  <div class="site-footer__hours-title">

                    <span class="site-footer__hours-dot"></span>

                    <h3>${escapeHTML(t.hoursHeading)}</h3>

                    <span class="site-footer__status"></span>

                  </div>

                  <p>${escapeHTML(t.morning)}</p>
                  <p>${escapeHTML(t.evening)}</p>

                </div>

              </section>

              <!-- MAP -->
              <section class="site-footer__map-section">

                <h3 class="site-footer__heading">
                  ${escapeHTML(t.mapHeading)}
                </h3>

                <p class="site-footer__map-description">
                  ${escapeHTML(t.mapDescription)}
                </p>

                <div class="site-footer__map">

                  <iframe
                    src="${MAP_URL}"
                    title="${escapeHTML(t.mapTitle)}"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                  ></iframe>

                </div>

                <a
                  class="site-footer__map-link"
                  href="${MAP_EXTERNAL_URL}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${escapeHTML(t.mapLink)}
                  <span aria-hidden="true">↗</span>
                </a>

              </section>

            </div>

            <!-- BOTTOM -->
            <div class="site-footer__bottom">

              <p>${escapeHTML(t.rights(year))}</p>

              <p class="site-footer__bottom-note">
                ${escapeHTML(t.note)}
              </p>

            </div>

          </div>

        </footer>

      </div>
    `;
  }

  /* =========================================
     OPENING STATUS UPDATE
  ========================================= */

  function updateOpeningStatus() {
    const statusElement = document.querySelector(
      ".site-footer__status"
    );

    if (!statusElement) return;

    const copy = translations[getCurrentLanguage()];
    const isOpen = getOpeningStatus();

    statusElement.textContent = isOpen
      ? copy.footer.open
      : copy.footer.closed;

    statusElement.classList.toggle("is-open", isOpen);
    statusElement.classList.toggle("is-closed", !isOpen);
  }

  /* =========================================
     CARD SCROLL REVEAL
     - يعيد الحركة في كل مرة تدخل البطاقات الشاشة أو تغادرها
     - يعمل مع أي اتجاه تمرير (لأسفل أو لأعلى)
  ========================================= */

  let revealObserver = null;
  let revealResizeHandler = null;

  function setupCardReveal() {
    // تنظيف أي مراقب سابق (مثلاً بعد تغيير اللغة وإعادة بناء البطاقات)
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

    if (revealResizeHandler) {
      window.removeEventListener("resize", revealResizeHandler);
      revealResizeHandler = null;
    }

    const grid = document.querySelector(".section6__cards");

    if (!grid) return;

    const cards = Array.from(
      grid.querySelectorAll(".section6__card")
    );

    if (!cards.length || typeof IntersectionObserver === "undefined") {
      return;
    }

    // لو كان النظام مضبوطاً على تقليل الحركة: ظهور تدريجي فقط بدون انزلاق
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const oneColumn = window.matchMedia("(max-width: 650px)");

    function getSide(index) {
      if (reduceMotion) return "fade";

      if (oneColumn.matches) {
        return index % 2 === 0 ? "from-right" : "from-left";
      }

      const startsOnRight =
        getComputedStyle(grid).direction === "rtl";

      if (index === 0) {
        return startsOnRight ? "from-right" : "from-left";
      }

      if (index === cards.length - 1) {
        return startsOnRight ? "from-left" : "from-right";
      }

      return "rise";
    }

    const STAGGER = 150;
    const ENTER_RATIO = 0.2;

    cards.forEach((card, index) => {
      card.setAttribute("data-reveal", getSide(index));
      card.removeAttribute("data-revealed");
    });

    revealObserver = new IntersectionObserver(
      (entries) => {
        const entering = [];

        entries.forEach((entry) => {
          const card = entry.target;

          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= ENTER_RATIO
          ) {
            if (!card.hasAttribute("data-revealed")) {
              entering.push(card);
            }
          } else if (!entry.isIntersecting) {
            // خرجت البطاقة بالكامل: نعيدها للحالة المخفية لتتحرك مجدداً
            card.removeAttribute("data-revealed");
            card.style.removeProperty("--reveal-delay");
          }
          // بين الحالتين نترك الوضع كما هو لتفادي الاهتزاز عند الحدود
        });

        entering
          .sort((a, b) => cards.indexOf(a) - cards.indexOf(b))
          .forEach((card, order) => {
            card.style.setProperty(
              "--reveal-delay",
              `${order * STAGGER}ms`
            );

            void card.offsetWidth;

            card.setAttribute("data-revealed", "");
          });
      },
      {
        threshold: [0, ENTER_RATIO],
        rootMargin: "0px 0px -6% 0px",
      }
    );

    cards.forEach((card) => revealObserver.observe(card));

    revealResizeHandler = () => {
      cards.forEach((card, index) => {
        card.setAttribute("data-reveal", getSide(index));
      });
    };

    window.addEventListener("resize", revealResizeHandler);
  }

  /* =========================================
     LANGUAGE SWITCH
  ========================================= */

  function setupLanguageSwitch() {
    const languageButton = document.querySelector("#languageToggle");

    if (!languageButton) return;

    languageButton.addEventListener("click", () => {
      window.setTimeout(() => {
        renderFooter();
      }, 0);
    });
  }

  /* =========================================
     RENDER FOOTER
  ========================================= */

  function renderFooter() {
    const mount = document.querySelector("#footerExperience");

    if (!mount) {
      console.error(
        'Footer error: element "#footerExperience" was not found in index.html.'
      );
      // البطاقات موجودة كـ HTML ثابت: نفعّل الحركة عليها مباشرة
      setupCardReveal();
      return;
    }

    const language = getCurrentLanguage();

    mount.innerHTML = createFooter(language);

    updateOpeningStatus();
    setupCardReveal();
  }

  /* =========================================
     INITIALIZATION
  ========================================= */

  function initFooter() {
    renderFooter();
    setupLanguageSwitch();

    window.setInterval(updateOpeningStatus, 60000);

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) {
        renderFooter();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooter);
  } else {
    initFooter();
  }
})();