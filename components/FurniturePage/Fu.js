
/* =========================================
   AL GHOSN ALATEEQ
   Furniture Page - Arabic / English
   Shared language with the main page
   Favorites + Lightbox + WhatsApp
========================================= */

(() => {
  "use strict";

  const LANGUAGE_KEY = "ghosn-alateeq-language";
  const FAVORITES_KEY = "ghosn-alateeq-favorites";
  const WHATSAPP_NUMBER = "966559914470";

  let currentLanguage = getLanguage();

  /* =========================================
     LANGUAGE STORAGE
  ========================================= */

  function getLanguage() {
    try {
      return localStorage.getItem(LANGUAGE_KEY) === "en"
        ? "en"
        : "ar";
    } catch {
      return "ar";
    }
  }

  /* =========================================
     TRANSLATIONS
  ========================================= */

  const translations = {
    ar: {
      dir: "rtl",
      title: "المفروشات",
      lead: "اكتشفوا مجموعتنا المختارة بعناية من المفروشات والقطع المميزة",
      favorites: "♡ المفضلة",
      home: "العودة إلى الرئيسية",
      videos: "فيديوهات الكنب",
      addFavorite: "إضافة إلى المفضلة",
      removeFavorite: "إزالة من المفضلة",
      price: "معرفة السعر",
      details: "تفاصيل القطعة",
      whatsapp: "تواصل معنا عبر واتساب",
      close: "إغلاق الصورة",

      categories: {
        sofas: "الكنب",
        dining: "طاولات الطعام",
        "coffee-tables": "طاولات القهوة",
        paintings: "اللوحات",
        curtains: "الستائر"
      },

      priceMessage: "مرحباً، رأيت هذه القطعة على موقع الغصن العتيق وأرغب بمعرفة سعرها وتفاصيلها.",
      detailsMessage: "مرحباً، أرغب بالحصول على تفاصيل أكثر عن هذه القطعة من الغصن العتيق، بما في ذلك الخامات والأبعاد والألوان المتوفرة.",

      itemName: {
        sofas: "كنب",
        dining: "طاولة طعام",
        "coffee-tables": "طاولة قهوة",
        paintings: "لوحة",
        curtains: "ستارة"
      }
    },

    en: {
      dir: "ltr",
      title: "Furniture",
      lead: "Discover our carefully curated collection of furniture and distinctive pieces.",
      favorites: "♡ Favorites",
      home: "Back to Home",
      videos: "Sofa Videos",
      addFavorite: "Add to Favorites",
      removeFavorite: "Remove from Favorites",
      price: "Ask for Price",
      details: "Product Details",
      whatsapp: "Contact us on WhatsApp",
      close: "Close Image",

      categories: {
        sofas: "Sofas",
        dining: "Dining Tables",
        "coffee-tables": "Coffee Tables",
        paintings: "Artworks",
        curtains: "Curtains"
      },

      priceMessage: "Hello, I saw this item on Al Ghosn Alateeq's website and would like to know its price and details.",
      detailsMessage: "Hello, I would like to know more about this item from Al Ghosn Alateeq, including its materials, dimensions, and available colors.",

      itemName: {
        sofas: "Sofa",
        dining: "Dining Table",
        "coffee-tables": "Coffee Table",
        paintings: "Artwork",
        curtains: "Curtain"
      }
    }
  };

  /* =========================================
     PRODUCT TRANSLATIONS
  ========================================= */

  const productTranslations = {
    sofas: [
      {
        name: "Sofa 1",
        description: "A cream sofa set with clean, understated lines and slim wooden legs, accented with soft blue cushions."
      },
      {
        name: "Sofa 2",
        description: "A comfortable seat upholstered in light grey fabric with sculptural vertical ribbing and a rounded, embracing design."
      },
      {
        name: "Sofa 3",
        description: "A curved cream sectional paired with two olive-green seats and black tables with geometric lines."
      },
      {
        name: "Sofa 4",
        description: "A cream sofa with soft curves and golden and light green cushions, complemented by layered grey tables."
      },
      {
        name: "Sofa 5",
        description: "A corner sofa in richly textured warm grey woven fabric, paired with walnut-toned tables."
      },
      {
        name: "Sofa 6",
        description: "A relaxing armchair upholstered in turquoise velvet, with a curved vertically ribbed back and golden legs."
      },
      {
        name: "Sofa 7",
        description: "A five-piece majlis set with cream upholstery and elegant dark wooden frames."
      },
      {
        name: "Sofa 8",
        description: "A three-seater sofa in sandy beige with a warm texture, bringing calm elegance to family spaces."
      },
      {
        name: "Sofa 9",
        description: "A curved cream sectional with two olive seats and light edging, set on a soft grey rug."
      },
      {
        name: "Sofa 10",
        description: "A corner sofa in soft warm beige fabric, contrasted with charcoal and grey woven cushions."
      }
    ],

    dining: [
      {
        name: "Dining Table 1",
        description: "A dining table with a light wooden top and slender angled legs, surrounded by eight cream upholstered chairs."
      },
      {
        name: "Dining Table 2",
        description: "A compact table with a light marble-effect top and natural wooden frame, paired with four curved-back chairs."
      },
      {
        name: "Dining Table 3",
        description: "A round dining table with a richly grained dark wooden top and four cream chairs with curved backs."
      },
      {
        name: "Dining Table 4",
        description: "A rectangular table with a warm brown wood finish, accompanied by four caramel velvet chairs."
      }
    ],

    "coffee-tables": [
      {
        name: "Coffee Table 1",
        description: "A dark walnut-finished set featuring a rectangular central table and four side tables with sculpted curved bases."
      },
      {
        name: "Coffee Table 2",
        description: "A round central table surrounded by four side tables with walnut finishes and intersecting bases."
      },
      {
        name: "Coffee Table 3",
        description: "A round table with a flared base and four matching side tables with elegant curved legs in dark brown."
      },
      {
        name: "Coffee Table 4",
        description: "A stone-grey set with vertical travertine-inspired lines, including a spacious central table and four side tables."
      },
      {
        name: "Coffee Table 5",
        description: "A warm sand-coloured set with a travertine-inspired texture and intersecting bases in a calm geometric design."
      },
      {
        name: "Coffee Table 6",
        description: "A round table with four side tables in a light sandy finish, adding a subtle sculptural presence to the living room."
      }
    ],

    paintings: [
      {
        name: "Artwork 1",
        description: "A portrait of a horse with a chestnut coat and black mane against a charcoal-grey abstract background."
      },
      {
        name: "Artwork 2",
        description: "A large feather in shades of turquoise and purple with golden threads, displayed on a white background in a black frame."
      },
      {
        name: "Artwork 3",
        description: "A vertical artwork featuring textured yellow flowers against a silvery grey background."
      },
      {
        name: "Artwork 4",
        description: "Two adjoining black-framed artworks featuring a golden feather and golden and turquoise leaves on a blue-grey background."
      },
      {
        name: "Artwork 5",
        description: "A vertical black-framed artwork featuring tropical leaves in gold, ivory, and grey-blue tones."
      },
      {
        name: "Artwork 6",
        description: "Feather-like leaves in turquoise and silver with raised golden accents, set in a black frame on a light background."
      },
      {
        name: "Artwork 7",
        description: "A vertical artwork featuring raised sunflowers with dark centres against a grey background with charcoal accents."
      },
      {
        name: "Artwork 8",
        description: "An abstract artwork with bold navy and camel brushstrokes on a cream background, finished with a black frame."
      },
      {
        name: "Artwork 9",
        description: "A large ivory flower with golden edges and flowing petals in shades of pink and brown, in a black frame."
      }
    ],

    curtains: [
      {
        name: "Curtain 1",
        description: "A natural linen-coloured curtain with flowing folds that fall gracefully from ceiling to floor."
      },
      {
        name: "Curtain 2",
        description: "A light grey roller blind with a clean, flat design that blends seamlessly with the window frame."
      },
      {
        name: "Curtain 3",
        description: "Dark walnut horizontal wooden slats that allow precise light control and bring warmth to the room."
      },
      {
        name: "Curtain 4",
        description: "A woven linen Roman blind with a light centre, sandy edges, and elegant horizontal folds."
      }
    ]
  };

  /* =========================================
     FAVORITES
  ========================================= */

  function getFavorites() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(FAVORITES_KEY)
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveFavorites(favorites) {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    );
  }

  function toggleFavorite(item) {
    let favorites = getFavorites();

    const exists = favorites.some(
      favorite => favorite.src === item.src
    );

    if (exists) {
      favorites = favorites.filter(
        favorite => favorite.src !== item.src
      );
    } else {
      favorites.push(item);
    }

    saveFavorites(favorites);
    return favorites;
  }

  function updateHeart(button, active) {
    const t = translations[currentLanguage];

    button.classList.toggle("is-active", active);
    button.textContent = active ? "♥" : "♡";

    button.setAttribute(
      "aria-pressed",
      String(active)
    );

    button.setAttribute(
      "aria-label",
      active ? t.removeFavorite : t.addFavorite
    );
  }

  function initializeFavorites() {
    const favorites = getFavorites();

    document.querySelectorAll(".furniture__card").forEach(card => {
      const image = card.querySelector("img");
      const heart = card.querySelector(".furniture__heart");

      if (!image || !heart) return;

      const item = {
        src: image.src,
        name: card.querySelector(".furniture__name")?.dataset.originalName ||
          card.querySelector(".furniture__name")?.textContent.trim() ||
          image.alt,
        text: card.querySelector(".furniture__desc")?.dataset.originalDescription ||
          card.querySelector(".furniture__desc")?.textContent.trim() ||
          "",
        alt: image.alt
      };

      const isFavorite = favorites.some(
        favorite => favorite.src === item.src
      );

      updateHeart(heart, isFavorite);

      heart.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const updatedFavorites = toggleFavorite(item);

        const active = updatedFavorites.some(
          favorite => favorite.src === item.src
        );

        updateHeart(heart, active);
      });
    });
  }

  /* =========================================
     SAVE ORIGINAL ARABIC TEXT
  ========================================= */

  function saveOriginalContent() {
    document.querySelectorAll(".furniture__card").forEach(card => {
      const name = card.querySelector(".furniture__name");
      const description = card.querySelector(".furniture__desc");
      const image = card.querySelector("img");

      if (name && !name.dataset.originalName) {
        name.dataset.originalName = name.textContent.trim();
      }

      if (description && !description.dataset.originalDescription) {
        description.dataset.originalDescription =
          description.textContent.trim();
      }

      if (image && !image.dataset.originalAlt) {
        image.dataset.originalAlt = image.alt;
      }
    });
  }

  /* =========================================
     WHATSAPP
  ========================================= */

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function createWhatsAppLink({
    label,
    message,
    ariaLabel,
    extraClass
  }) {
    const link = document.createElement("a");

    link.className = extraClass
      ? `furniture__inquiry ${extraClass}`
      : "furniture__inquiry";

    link.href = buildWhatsAppUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    link.setAttribute("aria-label", ariaLabel);

    return link;
  }

  function updateWhatsAppButtons() {
    const t = translations[currentLanguage];

    document.querySelectorAll(".furniture__card").forEach(card => {
      const image = card.querySelector("img");
      const name = card.querySelector(".furniture__name");
      const caption = card.querySelector("figcaption");

      if (!image || !name || !caption) return;

      const oldActions = caption.querySelector(".furniture__actions");

      if (oldActions) {
        oldActions.remove();
      }

      const itemName = name.textContent.trim();

      const priceMessage = `
${t.priceMessage}

${itemName}

${image.src}

Al Ghosn Alateeq.
      `.trim();

      const detailsMessage = `
${t.detailsMessage}

${itemName}

${image.src}

Al Ghosn Alateeq.
      `.trim();

      const actions = document.createElement("div");

      actions.className = "furniture__actions";

      actions.appendChild(
        createWhatsAppLink({
          label: t.price,
          message: priceMessage,
          ariaLabel: `${t.price}: ${itemName}`
        })
      );

      actions.appendChild(
        createWhatsAppLink({
          label: t.details,
          message: detailsMessage,
          ariaLabel: `${t.details}: ${itemName}`,
          extraClass: "furniture__inquiry--ghost"
        })
      );

      caption.appendChild(actions);
    });
  }

  /* =========================================
     FLOATING WHATSAPP BUTTON
  ========================================= */

  function initializeFloatingWhatsApp() {
    if (document.querySelector(".furniture__float-wa")) return;

    const link = document.createElement("a");

    link.className = "furniture__float-wa";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    `;

    (document.querySelector(".furniture") || document.body)
      .appendChild(link);

    updateFloatingWhatsApp();
  }

  function updateFloatingWhatsApp() {
    const link = document.querySelector(".furniture__float-wa");

    if (!link) return;

    const t = translations[currentLanguage];

    const message = currentLanguage === "en"
      ? "Hello Al Ghosn Alateeq, I would like to ask about your furniture collection. How can you help me?"
      : "مرحباً الغصن العتيق، أود الاستفسار عن مفروشاتكم. كيف يمكنكم مساعدتي؟";

    link.href = buildWhatsAppUrl(message);
    link.setAttribute("aria-label", t.whatsapp);
    link.title = t.whatsapp;
  }

  /* =========================================
     APPLY LANGUAGE
  ========================================= */

  function applyLanguage() {
    currentLanguage = getLanguage();

    const t = translations[currentLanguage];

    const furniture = document.querySelector(".furniture");

    if (!furniture) return;

    // اتجاه الصفحة
    furniture.dir = t.dir;
    furniture.lang = currentLanguage;

    document.documentElement.dir = t.dir;
    document.documentElement.lang = currentLanguage;

    // عنوان المتصفح
    document.title = currentLanguage === "en"
      ? "Furniture | Al Ghosn Alateeq"
      : "المفروشات | الغصن العتيق";

    // روابط الهيدر
    const navigationLinks = document.querySelectorAll(
      ".furniture__nav-actions .furniture__back"
    );

    if (navigationLinks[0]) {
      navigationLinks[0].textContent = t.favorites;
    }

    if (navigationLinks[1]) {
      navigationLinks[1].textContent = t.home;
    }

    // عنوان الصفحة
    const pageTitle = document.querySelector(".furniture__title");
    const pageLead = document.querySelector(".furniture__lead");

    if (pageTitle) {
      pageTitle.textContent = t.title;
    }

    if (pageLead) {
      pageLead.textContent = t.lead;
    }

    // الشعار
    const logo = document.querySelector(".furniture__intro-logo");

    if (logo) {
      logo.alt = currentLanguage === "en"
        ? "Al Ghosn Alateeq logo"
        : "شعار الغصن العتيق";
    }

    // روابط الصور
    const mainLogo = document.querySelector(".furniture__logo img");

    if (mainLogo) {
      mainLogo.alt = currentLanguage === "en"
        ? "Al Ghosn Alateeq"
        : "الغصن العتيق";
    }

    // عناوين الأقسام
    Object.entries(t.categories).forEach(([id, label]) => {
      const section = document.getElementById(id);

      if (!section) return;

      const heading = section.querySelector(".furniture__cat-title");

      if (heading) {
        heading.textContent = label;
      }
    });

    // عنوان الفيديوهات
    const videosTitle = document.querySelector(
      ".furniture__videos-title"
    );

    if (videosTitle) {
      videosTitle.textContent = t.videos;
    }

    // ترجمة القطع وأوصافها
    Object.entries(productTranslations).forEach(([category, items]) => {
      const section = document.getElementById(category);

      if (!section) return;

      const cards = section.querySelectorAll(".furniture__card");

      cards.forEach((card, index) => {
        const item = items[index];

        const name = card.querySelector(".furniture__name");
        const description = card.querySelector(".furniture__desc");
        const image = card.querySelector("img");

        if (currentLanguage === "en" && item) {
          if (name) {
            name.textContent = item.name;
          }

          if (description) {
            description.textContent = item.description;
          }

          if (image) {
            image.alt = item.name;
          }
        } else if (currentLanguage === "ar") {
          if (name && name.dataset.originalName) {
            name.textContent = name.dataset.originalName;
          }

          if (description && description.dataset.originalDescription) {
            description.textContent =
              description.dataset.originalDescription;
          }

          if (image && image.dataset.originalAlt) {
            image.alt = image.dataset.originalAlt;
          }
        }
      });
    });

    // تحديث أزرار المفضلة
    document.querySelectorAll(".furniture__card").forEach(card => {
      const heart = card.querySelector(".furniture__heart");

      if (heart) {
        updateHeart(
          heart,
          heart.classList.contains("is-active")
        );
      }
    });

    // تحديث أزرار واتساب ورسائلها حسب اللغة
    updateWhatsAppButtons();
    updateFloatingWhatsApp();

    // زر إغلاق الصورة
    const closeButton = document.getElementById("lightbox-close");

    if (closeButton) {
      closeButton.setAttribute("aria-label", t.close);
    }
  }

  /* =========================================
     LISTEN TO LANGUAGE CHANGES
  ========================================= */

  window.addEventListener("storage", event => {
    if (event.key === LANGUAGE_KEY) {
      applyLanguage();
    }
  });

  /* =========================================
     LIGHTBOX
  ========================================= */

  function openLightbox(imageElement) {
    const lightbox = document.getElementById("furniture-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = imageElement.src;
    lightboxImage.alt = imageElement.alt;

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lightbox = document.getElementById("furniture-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    if (!lightbox) return;

    lightbox.hidden = true;

    if (lightboxImage) {
      lightboxImage.src = "";
    }

    document.body.style.overflow = "";
  }

  function initializeLightbox() {
    const lightbox = document.getElementById("furniture-lightbox");
    const closeButton = document.getElementById("lightbox-close");

    document.querySelectorAll(".furniture__card img").forEach(image => {
      image.addEventListener("click", () => {
        openLightbox(image);
      });
    });

    if (closeButton) {
      closeButton.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
      lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });
    }

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    });
  }

  /* =========================================
     INITIALIZE
  ========================================= */

  function init() {
    // حفظ النصوص العربية الأصلية قبل الترجمة
    saveOriginalContent();

    // تشغيل المفضلة
    initializeFavorites();

    // تشغيل واتساب
    initializeFloatingWhatsApp();

    // تشغيل تكبير الصور
    initializeLightbox();

    // تطبيق اللغة المختارة من الصفحة الرئيسية
    applyLanguage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
