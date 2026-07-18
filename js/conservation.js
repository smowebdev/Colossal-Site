jQuery(document).ready(function ($) {
  function duplicateSlides(selector, minSlides = 8) {
    const $wrapper = $(`${selector} .swiper-wrapper`);

    if (!$wrapper.length) return;

    const $originals = $wrapper.children();

    if ($originals.length >= minSlides) return;

    $originals.each(function () {
      $wrapper.append($(this).clone());
    });
  }

  duplicateSlides(".planet-crisis__slider", 8);

  const speciesSlider = new Swiper(".planet-crisis__slider", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 3.27,
    spaceBetween: 20,
    speed: 800,

    navigation: {
      prevEl: ".planet-crisis__prev",
      nextEl: ".planet-crisis__next",
    },

    on: {
      init(swiper) {
        updateOffset(swiper);
      },
      slideChangeTransitionStart(swiper) {
        updateOffset(swiper);
      },
    },
  });

  function updateOffset(swiper) {
    swiper.slides.forEach((slide, index) => {
      const isOffset = Math.abs(index - swiper.activeIndex) % 2 !== 0;

      slide.classList.toggle("is-offset", isOffset);
    });
  }

  const responsibilitySlider = new Swiper(".our-responsibility__slider", {
    slidesPerView: 3.21,
    navigation: {
      prevEl: ".our-responsibility-prev",
      nextEl: ".our-responsibility-next",
    },
  });
  const swiperAdvisor = new Swiper(".human-factor__slider", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".human-factor-next",
      prevEl: ".human-factor-prev",
    },

    on: {
      init: function () {
        updateFraction(this, ".human-factor-counter");
      },
      slideChange: function () {
        updateFraction(this, ".human-factor-counter");
      },
    },
  });
  function updateFraction(swiper, wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);

    if (!wrapper) return;

    const current = wrapper.querySelector(".current");
    const total = wrapper.querySelector(".total");

    if (!current || !total) return;

    let realIndex = swiper.realIndex + 1;
    let totalSlides = swiper.slides.length - (swiper.loop ? 2 : 0);

    current.textContent = realIndex.toString().padStart(2, "0");
    total.textContent = totalSlides.toString().padStart(2, "0");
  }
});
