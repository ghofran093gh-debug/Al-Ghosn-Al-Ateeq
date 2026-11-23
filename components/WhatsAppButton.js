
const STORAGE_KEY = "ghosn-alateeq-favorites";
const PHONE = "966559914470";

function initWhatsAppButton() {
  const button = document.querySelector(".whatsapp-button");

  if (!button) return;

  button.addEventListener("click", () => {
    let favorites = [];

    try {
      favorites =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      favorites = [];
    }

    const message = [
      "مرحباً، وصلت إليكم من خلال موقع الغصن العتيق 🌿",
      "",
      "أرغب بالاستفسار عن المنتجات التي أضفتها إلى المفضلة:",
      "",
      ...favorites.map((item, index) =>
        `${index + 1}. منتج من الغصن العتيق\nرابط الصورة: ${new URL(item.src, window.location.origin).href}`
      ),
      "",
      "شكراً لكم."
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}

document.addEventListener("DOMContentLoaded", initWhatsAppButton);
