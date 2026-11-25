
(() => {
  "use strict";

  const STORAGE_KEY = "ghosn-alateeq-language";

  const translations = {
    ar: {
      dir: "rtl",

      section: {
        brand: "الغصن العتيق",
        title: "اكتشفوا عالمنا",
        intro: "تفاصيل مختارة بعناية لتضيف لمنازلكم لمسة من الأناقة والجمال.",
        discover: "اكتشف المزيد",
        arrow: "←",
        cards: [
          {
            name: "طاولات الطعام",
            description: "تصاميم تجمع بين الفخامة والعملية."
          },
          {
            name: "اللوحات الفنية",
            description: "لمسات فنية تمنح المكان شخصية مميزة."
          },
          {
            name: "الستائر",
            description: "تفاصيل أنيقة تكمل جمال المساحات."
          }
        ]
      },

      footer: {
        navLabel: "روابط الموقع",
        navHeading: "روابط سريعة",
        links: [
          "الرئيسية",
          "المفروشات",
          "طاولات الطعام",
          "الستائر",
          "المفضلة"
        ],
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
        mapDescription: "يسعدنا زيارتكم والتعرف على مجموعتنا في المملكة السعودية الباحة.",
        mapTitle: "موقع الغصن العتيق على الخريطة",
        mapLink: "عرض الموقع على خرائط Google",
        rights: "الغصن العتيق. جميع الحقوق محفوظة.",
        note: "صُمم بعناية واهتمام بالتفاصيل."
      }
    },

    en: {
      dir: "ltr",

      section: {
        brand: "AL GHOSN ALATEEQ",
        title: "Discover Our World",
        intro: "Carefully selected details to bring elegance and beauty into your home.",
        discover: "Discover More",
        arrow: "→",
        cards: [
          {
            name: "Dining Tables",
            description: "Designs that combine elegance and functionality."
          },
          {
            name: "Artworks",
            description: "Artistic touches that give every space a unique character."
          },
          {
            name: "Curtains",
            description: "Elegant details that complete the beauty of your space."
          }
        ]
      },

      footer: {
        navLabel: "Website navigation",
        navHeading: "Quick Links",
        links: [
          "Home",
          "Furniture",
          "Dining Tables",
          "Curtains",
          "Favorites"
        ],
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
        mapDescription: "We look forward to welcoming you and showing you our collection.",
        mapTitle: "Al Ghosn Alateeq location on Google Maps",
        mapLink: "View on Google Maps",
        rights: "Al Ghosn Alateeq. All rights reserved.",
        note: "Designed with care and attention to detail."
      }
    }
  };

  /* =========================================
     LANGUAGE
  ========================================= */

  function getLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "en"
        ? "en"
        : "ar";
    } catch {
      return "ar";
    }
  }

  function setText(element, value) {
    if (element && value !== undefined) {
      element.textContent = value;
    }
  }

  /* =========================================
     APPLY LANGUAGE
  ========================================= */

  function applyFooterLanguage() {
    const language = getLanguage();
    const t = translations[language];

    const experience = document.querySelector(".footer-experience");
    const showcase = document.querySelector(".section6");
    const footer = document.querySelector(".site-footer");

    if (!experience || !showcase || !footer) {
      console.error("Footer: لم يتم العثور على عناصر الفوتر في HTML.");
      return;
    }

    experience.dir = t.dir;
    showcase.dir = t.dir;
    footer.dir = t.dir;

    // قسم اكتشفوا عالمنا
    const heading = showcase.querySelector(".section6__heading");

    if (heading) {
      setText(heading.querySelector("span"), t.section.brand);
      setText(heading.querySelector("h2"), t.section.title);
      setText(heading.querySelector("p"), t.section.intro);
    }

    // البطاقات
    const cards = showcase.querySelectorAll(".section6__card");

    cards.forEach((card, index) => {
      const data = t.section.cards[index];

      if (!data) return;

      setText(card.querySelector("h3"), data.name);
      setText(card.querySelector("p"), data.description);

      const discover = card.querySelector(".section6__link");

      if (discover) {
        const arrow = discover.querySelector("span");

        if (discover.childNodes[0]) {
          discover.childNodes[0].textContent =
            t.section.discover + " ";
        }

        setText(arrow, t.section.arrow);
      }

      const image = card.querySelector("img");

      if (image) {
        image.alt = data.name;
      }
    });

    // روابط الموقع
    const nav = footer.querySelector(".site-footer__nav");

    if (nav) {
      nav.setAttribute("aria-label", t.footer.navLabel);

      setText(
        nav.querySelector(".site-footer__heading"),
        t.footer.navHeading
      );

      const links = nav.querySelectorAll("a");

      links.forEach((link, index) => {
        if (t.footer.links[index]) {
          setText(link, t.footer.links[index]);
        }
      });
    }

    // التواصل
    const contact = footer.querySelector(".site-footer__contact");

    if (contact) {
      const headings = contact.querySelectorAll(".site-footer__heading");

      setText(headings[0], t.footer.contactHeading);

      setText(
        contact.querySelector(".site-footer__contact-intro"),
        t.footer.contactIntro
      );

      const whatsapp = contact.querySelector(".site-footer__whatsapp");

      if (whatsapp) {
        const arrow = whatsapp.querySelector(".site-footer__arrow");

        if (whatsapp.childNodes[1]) {
          whatsapp.childNodes[1].textContent =
            " " + t.footer.whatsapp + " ";
        }

        setText(arrow, "↗");
      }

      const snapchat = contact.querySelector(".site-footer__socials a");

      if (snapchat) {
        snapchat.setAttribute("aria-label", t.footer.snapchat);
        snapchat.title = t.footer.snapchat;
      }
    }

    // ساعات العمل
    const hours = footer.querySelector(".site-footer__hours");

    if (hours) {
      setText(
        hours.querySelector("h3"),
        t.footer.hoursHeading
      );

      const paragraphs = hours.querySelectorAll("p");

      setText(paragraphs[0], t.footer.morning);
      setText(paragraphs[1], t.footer.evening);
    }

    // الخريطة
    const mapSection = footer.querySelector(".site-footer__map-section");

    if (mapSection) {
      setText(
        mapSection.querySelector(".site-footer__heading"),
        t.footer.mapHeading
      );

      setText(
        mapSection.querySelector(".site-footer__map-description"),
        t.footer.mapDescription
      );

      const iframe = mapSection.querySelector("iframe");

      if (iframe) {
        iframe.title = t.footer.mapTitle;
      }

      setText(
        mapSection.querySelector(".site-footer__map-link"),
        t.footer.mapLink
      );
    }

    // الحقوق
    const copyright = footer.querySelector("#footerCopyright");

    if (copyright) {
      const year = new Date().getFullYear();

      copyright.textContent = `© ${year} ${t.footer.rights}`;
    }

    setText(
      footer.querySelector(".site-footer__bottom-note"),
      t.footer.note
    );

    // تحديث حالة الدوام
    updateOpeningStatus(language);
  }

  /* =========================================
     SAUDI TIME
  ========================================= */

  function getSaudiTime() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Riyadh",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());

    const hour = Number(
      parts.find(part => part.type === "hour").value
    );

    const minute = Number(
      parts.find(part => part.type === "minute").value
    );

    return hour * 60 + minute;
  }

  /* =========================================
     OPENING HOURS
  ========================================= */

  function updateOpeningStatus(language = getLanguage()) {
    const status = document.querySelector("#footerOpeningStatus");

    if (!status) return;

    const time = getSaudiTime();

    const morningStart = 9 * 60;
    const morningEnd = 12 * 60;

    const eveningStart = 16 * 60;
    const eveningEnd = 23 * 60;

    const isOpen =
      (time >= morningStart && time < morningEnd) ||
      (time >= eveningStart && time < eveningEnd);

    const t = translations[language] || translations.ar;

    status.textContent = isOpen
      ? t.footer.open
      : t.footer.closed;

    status.classList.toggle("is-open", isOpen);
    status.classList.toggle("is-closed", !isOpen);

    status.setAttribute(
      "aria-label",
      status.textContent
    );
  }

  /* =========================================
     LANGUAGE SWITCH
  ========================================= */

  function setupLanguageSwitch() {
    const button = document.querySelector("#languageToggle");

    if (!button) return;

    button.addEventListener("click", () => {
      setTimeout(() => {
        applyFooterLanguage();
      }, 0);
    });
  }

  // تغيير اللغة من تبويب آخر
  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY) {
      applyFooterLanguage();
    }
  });

  /* =========================================
     INITIALIZE
  ========================================= */

  function init() {
    applyFooterLanguage();
    setupLanguageSwitch();

    // تحديث حالة الدوام كل دقيقة
    setInterval(() => {
      updateOpeningStatus();
    }, 60000);

    // تحديث الحالة عند العودة إلى الصفحة
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        updateOpeningStatus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
