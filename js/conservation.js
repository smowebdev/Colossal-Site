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
});
