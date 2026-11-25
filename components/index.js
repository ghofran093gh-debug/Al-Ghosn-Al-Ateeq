
const LOGO = "../public/logo.png";

const SLIDES = [
  { src: "../public/img1.jpeg", pos: "50% 55%" },
  { src: "../public/img2.jpg", pos: "50% 50%" },
  { src: "../public/img3.jpg", pos: "50% 48%" },
  { src: "../public/img4.jpg", pos: "50% 52%" },
];

const HOLD_MS = 4000;
const FADE_MS = 1400;

const LANGUAGE_KEY = "ghosn-alateeq-language";
const DEFAULT_LANGUAGE = "ar";

const translations = {
  ar: {
    dir: "rtl",
    name: "الغصن العتيق",
    subtitle: "تفصيل حسب الطلب",
    tagline: "حيث تلتقي أناقة الأثاث بفنّ التفاصيل",
    nav: {
      home: "الرئيسية",
      collections: "الأثاث والمجموعات",
      favorites: "المفضلة",
    },
    navLabel: "التنقل الرئيسي",
    logoAlt: "شعار الغصن العتيق",
    switchTo: "English",
    switchToLang: "en",
    switchLabel: "التبديل إلى اللغة الإنجليزية",
  },

  en: {
    dir: "ltr",
    name: "Al Ghosn Al Ateeq",
    subtitle: "Tailored to Order",
    tagline: "Where furniture elegance meets the art of detail.",
    nav: {
      home: "Home",
      collections: "Furniture & Collections",
      favorites: "Favorites",
    },
    navLabel: "Main navigation",
    logoAlt: "Al Ghosn Al Ateeq logo",
    switchTo: "العربية",
    switchToLang: "ar",
    switchLabel: "Switch to Arabic",
  },
};

// Read saved language
function readStoredLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);

    return saved === "en" || saved === "ar"
      ? saved
      : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

let lang = readStoredLanguage();

// Elements
const hero = document.querySelector(".hero");

const brandName = document.getElementById("brandName");
const brandSubtitle = document.getElementById("brandSubtitle");
const brandTagline = document.getElementById("brandTagline");
const brandLogo = document.getElementById("brandLogo");

brandLogo.src = LOGO;

const languageToggle = document.getElementById("languageToggle");
const languageLabel = document.getElementById("languageLabel");
const nav = document.querySelector(".hero__nav");
const navLinks = document.querySelectorAll("[data-nav]");

const slidesElements = document.querySelectorAll(".hero__slide");

let active = 0;
let leaving = null;
let busy = false;

let holdTimer = null;
let leaveTimer = null;

// Preload images
SLIDES.forEach(({ src }) => {
  const image = new Image();
  image.src = src;
});

// Apply language
function applyLanguage(nextLanguage) {
  lang = nextLanguage === "en" ? "en" : "ar";

  const t = translations[lang];

  hero.classList.toggle("hero--ar", lang === "ar");
  hero.classList.toggle("hero--en", lang === "en");

  hero.dir = t.dir;
  hero.lang = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;
  document.title = t.name;

  brandName.textContent = t.name;
  brandSubtitle.textContent = t.subtitle;
  brandTagline.textContent = t.tagline;

  brandLogo.alt = t.logoAlt;

  nav.dir = t.dir;
  nav.setAttribute("aria-label", t.navLabel);

  navLinks.forEach((link) => {
    const key = link.dataset.nav;
    const label = t.nav[key];

    link.setAttribute("aria-label", label);

    const tooltip = link.querySelector(".hero__tip");

    if (tooltip) {
      tooltip.textContent = label;
    }
  });

  languageLabel.textContent = t.switchTo;
  languageLabel.lang = t.switchToLang;

  languageToggle.setAttribute("aria-label", t.switchLabel);

  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    // The language still works if storage is unavailable.
  }
}

// Language switch
languageToggle.addEventListener("click", () => {
  applyLanguage(lang === "ar" ? "en" : "ar");
});

// Follow language changes from another browser tab
window.addEventListener("storage", (event) => {
  if (
    event.key === LANGUAGE_KEY &&
    (event.newValue === "ar" || event.newValue === "en")
  ) {
    applyLanguage(event.newValue);
  }
});

// Schedule next slide
function scheduleHold() {
  clearTimeout(holdTimer);

  holdTimer = setTimeout(() => {
    advanceTo((active + 1) % SLIDES.length);
  }, HOLD_MS);
}

// Change slide
function advanceTo(next) {
  if (busy || next === active) return;

  busy = true;

  const previous = active;

  leaving = previous;
  active = next;

  slidesElements.forEach((slide, index) => {
    slide.classList.remove("is-active", "is-leaving");
    slide.removeAttribute("data-state");

    if (index === active) {
      slide.dataset.state = "active";
      slide.style.backgroundImage = `url("${SLIDES[index].src}")`;
      slide.style.backgroundPosition = SLIDES[index].pos;
    }

    if (index === leaving) {
      slide.dataset.state = "leaving";
    }
  });

  clearTimeout(leaveTimer);

  leaveTimer = setTimeout(() => {
    slidesElements[previous].removeAttribute("data-state");

    leaving = null;
    busy = false;

    scheduleHold();
  }, FADE_MS + 40);
}

// Navigation events
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const page = link.dataset.nav;

    if (page === "collections" || page === "favorites") {
      window.dispatchEvent(
        new CustomEvent("ghosn:navigate", {
          detail: { page },
        })
      );
    }
  });
});

// Initialize slideshow
SLIDES.forEach((slide, index) => {
  if (slidesElements[index]) {
    slidesElements[index].style.backgroundImage = `url("${slide.src}")`;
    slidesElements[index].style.backgroundPosition = slide.pos;
  }
});

applyLanguage(lang);
scheduleHold();

// Cleanup if the page is unloaded
window.addEventListener("beforeunload", () => {
  clearTimeout(holdTimer);
  clearTimeout(leaveTimer);
});
