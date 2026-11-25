
const STORAGE_KEY = "ghosn-alateeq-favorites";
const LANGUAGE_KEY = "ghosn-alateeq-language";

let currentLanguage = getLanguage();

function getLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
}

const translations = {
  ar: {
    title: "المفضلة",
    lead: "كل القطع التي اخترتموها بعناية في مكان واحد",
    back: "العودة إلى المفروشات",
    saved: "القطع المحفوظة",
    piece: "قطعة",
    pieces: "قطع",
    empty: "قائمتكم فارغة حالياً",
    emptyText: "يمكنكم إضافة القطع التي أعجبتكم إلى المفضلة.",
    browse: "اكتشفوا المفروشات",
    remove: "حذف من المفضلة",
    defaultName: "قطعة من الغصن العتيق",
    imageError: "تعذر تحميل صورة المنتج",
    whatsapp: "تواصل معنا عبر واتساب"
  },
  en: {
    title: "Favorites",
    lead: "All the pieces you carefully selected, gathered in one place.",
    back: "Back to Furniture",
    saved: "Saved Items",
    piece: "item",
    pieces: "items",
    empty: "Your favorites list is currently empty",
    emptyText: "You can add the pieces you love to your favorites.",
    browse: "Explore Furniture",
    remove: "Remove from Favorites",
    defaultName: "A piece from Al Ghosn Alateeq",
    imageError: "Unable to load product image",
    whatsapp: "Contact us on WhatsApp"
  }
};

/* قراءة المفضلة */
function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

/* حفظ المفضلة */
function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

/* تحويل مسار الصورة */
function getImageUrl(src) {
  if (!src) return "";

  try {
    if (/^(https?:|data:|blob:|\/)/i.test(src)) {
      return new URL(src, window.location.origin).href;
    }

    return new URL(
      src,
      new URL("./FurniturePage/Fu.html", window.location.href)
    ).href;
  } catch {
    return src;
  }
}

/* عدد القطع */
function getCountText(count) {
  const t = translations[currentLanguage];

  if (currentLanguage === "en") {
    return `${count} ${count === 1 ? t.piece : t.pieces}`;
  }

  return `${count} ${t.pieces}`;
}

/* ترجمة العناصر الثابتة */
function applyFavoritesLanguage() {
  currentLanguage = getLanguage();

  const t = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    currentLanguage === "en" ? "ltr" : "rtl";

  document.title = currentLanguage === "en"
    ? "Favorites | Al Ghosn Alateeq"
    : "المفضلة | الغصن العتيق";

  const title = document.querySelector(".furniture__title");
  const lead = document.querySelector(".furniture__lead");
  const back = document.querySelector(".furniture__back");
  const savedTitle = document.querySelector(".favorites-toolbar .furniture__cat-title");
  const emptyTitle = document.querySelector(".favorites-empty h2");
  const emptyText = document.querySelector(".favorites-empty p");
  const browseButton = document.querySelector(".browse-button");
  const whatsapp = document.querySelector(".favorites-whatsapp");
  const logo = document.querySelectorAll(".furniture__logo img, .furniture__intro-logo");

  if (title) title.textContent = t.title;
  if (lead) lead.textContent = t.lead;
  if (back) back.textContent = t.back;
  if (savedTitle) savedTitle.textContent = t.saved;
  if (emptyTitle) emptyTitle.textContent = t.empty;
  if (emptyText) emptyText.textContent = t.emptyText;
  if (browseButton) browseButton.textContent = t.browse;

  logo.forEach(image => {
    image.alt = currentLanguage === "en"
      ? "Al Ghosn Alateeq"
      : "الغصن العتيق";
  });

  if (whatsapp) {
    whatsapp.setAttribute("aria-label", t.whatsapp);
    whatsapp.title = t.whatsapp;
  }
}

/* إنشاء وعرض المنتجات */
function renderFavorites() {
  const grid = document.getElementById("favorites-grid");
  const empty = document.getElementById("favorites-empty");
  const count = document.getElementById("favorites-count");

  if (!grid || !empty || !count) return;

  const t = translations[currentLanguage];
  const favorites = getFavorites();

  grid.innerHTML = "";
  count.textContent = getCountText(favorites.length);

  if (favorites.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  favorites.forEach(item => {
    const card = document.createElement("article");
    card.className = "favorite-card";

    const imageWrap = document.createElement("figure");
    imageWrap.className = "favorite-card__image-wrap";

    const image = document.createElement("img");
    image.src = getImageUrl(item.src);
    image.alt = item.alt || item.name || t.defaultName;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.alt = t.imageError;
    }, { once: true });

    imageWrap.appendChild(image);

    const removeButton = document.createElement("button");
    removeButton.className = "favorite-remove";
    removeButton.type = "button";
    removeButton.textContent = "♥";
    removeButton.setAttribute("aria-label", t.remove);
    removeButton.title = t.remove;

    removeButton.addEventListener("click", () => {
      const updated = getFavorites();

      const itemIndex = updated.findIndex(
        favorite => favorite.src === item.src
      );

      if (itemIndex !== -1) {
        updated.splice(itemIndex, 1);
        saveFavorites(updated);
      }

      renderFavorites();
    });

    const info = document.createElement("div");
    info.className = "favorite-card__info";

    const name = document.createElement("h3");
    name.textContent = item.name || t.defaultName;

    const description = document.createElement("p");
    description.textContent =
      item.text || item.description || "";

    info.append(name, description);
    card.append(imageWrap, removeButton, info);
    grid.appendChild(card);
  });
}

/* تشغيل الصفحة */
function initializeFavoritesPage() {
  applyFavoritesLanguage();
  renderFavorites();
}

document.addEventListener("DOMContentLoaded", initializeFavoritesPage);

/* تحديث اللغة عند تغييرها من تبويب آخر */
window.addEventListener("storage", event => {
  if (event.key === LANGUAGE_KEY) {
    applyFavoritesLanguage();
    renderFavorites();
  }

  if (event.key === STORAGE_KEY) {
    renderFavorites();
  }
});
