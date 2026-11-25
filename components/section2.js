
/* =========================================
   SECTION 2 - الغصن العتيق
   JavaScript عادي بدون React
========================================= */

(() => {
  const section = document.querySelector(".section2");
  if (!section) return;

  /* صور الصالون المتبدلة */
  const salonImages = [
    "../public/immg3.jpg",
    "../public/immg4.jpg",
    "../public/immg5.jpg"
  ];

  /* الصور المرافقة للمراحل الثلاث */
  const designSections = [
    { number: "01", image: "../public/immg10.jpg" },
    { number: "02", image: "../public/immg12.jpg" },
    { number: "03", image: "../public/immg11.jpg" }
  ];

  /* النصوص العربية والإنجليزية */
  const translations = {
    ar: {
      eyebrow: "من اختيارك إلى التنفيذ",
      title: "صالونك... بذوقك الخاص",
      intro: "امنح أثاثك حياة متجددة، واختر التفاصيل التي تشبهك. نحن نرافقك في كل خطوة من اختيار القماش واللون إلى أدق مراحل التنفيذ.",

      sections: [
        {
          title: "كيف نختار الألوان؟",
          description: "لكل منزل ألوانه وروحه الخاصة. نساعدك على اختيار الأقمشة والألوان التي تنسجم مع أثاث منزلك، وتتكامل مع الجدران والإضاءة والتفاصيل المحيطة، لنصل معاً إلى مظهر أنيق يعكس ذوقك ويمنح مساحتك إحساساً بالانسجام.",
          imageAlt: "عينات الأقمشة والألوان المستخدمة في التنجيد",
          label: "ألوان تنسجم مع ذوقك"
        },
        {
          title: "اختر تصميمك",
          description: "ابدأ باختيار الشكل الذي تحبه، ثم حدّد نوع القماش وملمسه ولونه، واختر التفاصيل التي تمنح الصالون طابعه الخاص. سواء كنت تميل إلى الأسلوب الكلاسيكي العريق أو التصميم العصري الهادئ، نساعدك على تنسيق اختياراتك لتناسب منزلك وتعبر عن شخصيتك.",
          imageAlt: "تصاميم وأشكال الأثاث والصالونات",
          label: "تفاصيل تصنع الفرق"
        },
        {
          title: "كيف ننفّذ عملنا؟",
          description: "بعد اعتماد اختياراتك، يبدأ العمل في مشغلنا على تجديد صالونك وتغيير قماشه وفق التصميم المتفق عليه. نهتم بتفاصيل التنجيد ودقة التنفيذ وجودة التشطيب، حتى يستعيد أثاثك جماله بإطلالة متجددة تجمع بين الراحة والأناقة.",
          imageAlt: "تنفيذ أعمال تجديد وتنجيد الأثاث",
          label: "عناية في كل تفصيل"
        }
      ],

      /* بطاقة اختر تصميمك */
      cta: {
        eyebrow: "تصميم يعبّر عنك",
        title: "اختر تصميمك",
        subtitle: "ودعنا نصنع لك ما يشبه ذوقك",
        description: "من الفكرة الأولى إلى أدق التفاصيل، نصمم أثاثك ليعكس شخصيتك وينسجم مع منزلك.",
        button: "تواصل معنا",
        note: "لنتحدث عن تصميمك وتفاصيله"
      },

      closingName: "الغصن العتيق",
      closingText: "الجمال يبدأ من التفاصيل."
    },

    en: {
      eyebrow: "From Your Choice to Completion",
      title: "Your Sofa Set... Your Own Taste",
      intro: "Give your furniture a new life and choose the details that reflect you. We accompany you at every step, from choosing the fabric and color to the finest stages of execution.",

      sections: [
        {
          title: "How Do We Choose the Colors?",
          description: "Every home has its own colors and spirit. We help you choose fabrics and colors that harmonize with your furniture and complement the walls, lighting, and surrounding details, so that together we arrive at an elegant look that reflects your taste and gives your space a sense of harmony.",
          imageAlt: "Fabric and color samples used in upholstery",
          label: "Colors that suit your taste"
        },
        {
          title: "Choose Your Design",
          description: "Start by choosing the shape you love, then select the type, texture, and color of the fabric, and pick the details that give your sofa set its own character. Whether you lean toward the timeless classic style or a calm contemporary design, we help you coordinate your choices to suit your home and express your personality.",
          imageAlt: "Furniture and sofa set designs and shapes",
          label: "Details that make the difference"
        },
        {
          title: "How Do We Carry Out Our Work?",
          description: "Once your choices are approved, work begins in our workshop to renovate your sofa set and replace its fabric according to the agreed design. We care about the upholstery details, precision of execution, and quality of finish, so your furniture regains its beauty with a renewed look that combines comfort and elegance.",
          imageAlt: "Furniture renovation and upholstery work",
          label: "Care in every detail"
        }
      ],

      /* Choose Your Design Card */
      cta: {
        eyebrow: "A Design That Reflects You",
        title: "Choose Your Design",
        subtitle: "Let us create something that feels like you",
        description: "From the first idea to the finest details, we design furniture that reflects your personality and complements your home.",
        button: "Contact Us",
        note: "Let's talk about your design"
      },

      closingName: "Al Ghosn Al Ateeq",
      closingText: "Beauty begins with the details."
    }
  };

  /* معرفة اللغة الحالية */
  function getCurrentLanguage() {
    return localStorage.getItem("ghosn-alateeq-language") === "en"
      ? "en"
      : "ar";
  }

  /* إنشاء محتوى القسم */
  function renderSection() {
    const lang = getCurrentLanguage();
    const dir = lang === "ar" ? "rtl" : "ltr";
    const t = translations[lang];

    section.setAttribute("dir", dir);

    const visual = section.querySelector(".section2__visual");
    const right = section.querySelector(".section2__right");

    if (!visual || !right) return;

    /* إنشاء صور الخلفية */
    visual.innerHTML = `
      ${salonImages.map((image, index) => `
        <div
          class="section2__background ${index === 0 ? "is-active" : ""}"
          style="background-image: url('${image}')"
        ></div>
      `).join("")}

      <div class="section2__overlay"></div>
    `;

    /* إنشاء النصوص والصور والبطاقة */
    right.innerHTML = `
      <div class="section2__intro">

        <span class="section2__eyebrow">
          ${t.eyebrow}
        </span>

        <h2>${t.title}</h2>

        <p>${t.intro}</p>

      </div>

      ${designSections.map((item, index) => {
        const text = t.sections[index];

        return `
          <article class="section2__item">

            <div class="section2__item-heading">

              <span class="section2__number">
                ${item.number}
              </span>

              <h3>${text.title}</h3>

            </div>

            <p class="section2__description">
              ${text.description}
            </p>

            <div class="section2__detail-image">

              <img
                src="${item.image}"
                alt="${text.imageAlt}"
                loading="lazy"
              />

              <span>${text.label}</span>

            </div>

          </article>
        `;
      }).join("")}

      <!-- بطاقة اختر تصميمك -->
      <div class="design-cta">

        <span class="design-cta__eyebrow">
          ${t.cta.eyebrow}
        </span>

        <h3>${t.cta.title}</h3>

        <h4>${t.cta.subtitle}</h4>

        <p>${t.cta.description}</p>

        <a
          class="design-cta__button"
          href="https://wa.me/966559914470?text=${encodeURIComponent("مرحباً، أرغب بمعرفة المزيد عن تصميم أثاث خاص بي لدى الغصن العتيق.")}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${t.cta.button}
          <span aria-hidden="true">←</span>
        </a>

        <span class="design-cta__note">
          ${t.cta.note}
        </span>

      </div>

      <!-- خاتمة القسم -->
      <div class="section2__closing">

        <span>${t.closingName}</span>

        <p>${t.closingText}</p>

      </div>
    `;
  }

  /* تبديل صور الصالون كل خمس ثوانٍ */
  function startImageSlideshow() {
    let activeImage = 0;

    setInterval(() => {
      const backgrounds = section.querySelectorAll(
        ".section2__background"
      );

      if (!backgrounds.length) return;

      backgrounds[activeImage]?.classList.remove("is-active");

      activeImage = (activeImage + 1) % backgrounds.length;

      backgrounds[activeImage]?.classList.add("is-active");

    }, 5000);
  }

  /* تشغيل القسم */
  renderSection();
  startImageSlideshow();

  /* متابعة تغيير اللغة من صفحة أخرى */
  window.addEventListener("storage", (event) => {
    if (event.key === "ghosn-alateeq-language") {
      renderSection();
    }
  });

  /* متابعة زر اللغة الموجود في الهيدر */
  const languageToggle = document.getElementById("languageToggle");

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      setTimeout(renderSection, 0);
    });
  }

})();
