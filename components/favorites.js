
const STORAGE_KEY = "ghosn-alateeq-favorites";

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
    // إذا كان الرابط كاملاً أو يبدأ من جذر الموقع
    if (/^(https?:|data:|blob:|\/)/i.test(src)) {
      return new URL(src, window.location.origin).href;
    }

    // المسارات النسبية للصور محفوظة نسبةً إلى صفحة المفروشات
    return new URL(
      src,
      new URL("./FurniturePage/Fu.html", window.location.href)
    ).href;
  } catch {
    return src;
  }
}

/* إنشاء وعرض المنتجات */
function renderFavorites() {
  const grid = document.getElementById("favorites-grid");
  const empty = document.getElementById("favorites-empty");
  const count = document.getElementById("favorites-count");

  if (!grid || !empty || !count) return;

  const favorites = getFavorites();

  grid.innerHTML = "";
  count.textContent = `${favorites.length} قطعة`;

  if (favorites.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  favorites.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "favorite-card";

    const imageWrap = document.createElement("figure");
    imageWrap.className = "favorite-card__image-wrap";

    const image = document.createElement("img");
    image.src = getImageUrl(item.src);
    image.alt = item.alt || item.name || "منتج مفضل";
    image.loading = "lazy";

    image.addEventListener("error", () => {
      console.error("تعذر تحميل صورة المنتج:", item.src);
      image.alt = "تعذر تحميل صورة المنتج";
    }, { once: true });

    imageWrap.appendChild(image);

    const removeButton = document.createElement("button");
    removeButton.className = "favorite-remove";
    removeButton.type = "button";
    removeButton.textContent = "♥";
    removeButton.setAttribute("aria-label", "حذف من المفضلة");

    removeButton.addEventListener("click", () => {
      const updated = getFavorites();
      updated.splice(index, 1);
      saveFavorites(updated);
      renderFavorites();
    });

    const info = document.createElement("div");
    info.className = "favorite-card__info";

    const name = document.createElement("h3");
    name.textContent = item.name || "قطعة من الغصن العتيق";

    const description = document.createElement("p");
    description.textContent = item.text || item.description || "";

    info.append(name, description);
    card.append(imageWrap, removeButton, info);
    grid.appendChild(card);
  });
}

/* تشغيل الصفحة */
document.addEventListener("DOMContentLoaded", renderFavorites);

/* تحديث المفضلة عند تغييرها من تبويب آخر */
window.addEventListener("storage", event => {
  if (event.key === STORAGE_KEY) {
    renderFavorites();
  }
});
