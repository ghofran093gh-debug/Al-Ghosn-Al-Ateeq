
/* =========================================
   Furniture Page - الغصن العتيق
   Favorites + Lightbox
========================================= */

const STORAGE_KEY = "ghosn-alateeq-favorites";

function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
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
  button.classList.toggle("is-active", active);
  button.textContent = active ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(active));
  button.setAttribute(
    "aria-label",
    active ? "إزالة من المفضلة" : "إضافة إلى المفضلة"
  );
}

function initializeFavorites() {
  const favorites = getFavorites();

  document.querySelectorAll(".furniture__card").forEach(card => {
    const image = card.querySelector("img");
    const heart = card.querySelector(".furniture__heart");

    if (!image || !heart) return;

    // مهم: image.src يحفظ رابط الصورة الكامل
    const item = {
      src: image.src,
      name: card.querySelector(".furniture__name")?.textContent.trim() || image.alt,
      text: card.querySelector(".furniture__desc")?.textContent.trim() || "",
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
   Lightbox
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
   Initialize
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeFavorites();
  initializeLightbox();
});
