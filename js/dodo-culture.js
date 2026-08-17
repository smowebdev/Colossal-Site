jQuery(document).ready(function ($) {
  const dodoFactSlider = new Swiper(".dodo-cl-facts-slider", {
    slidesPerView: 1.3,
    spaceBetween: designPxToViewportPx(60),
    loop: true,
    centeredSlides: true,
    initialSlide: 1,
    navigation: {
      nextEl: ".dodo-fact-next",
      prevEl: ".dodo-fact-prev",
    },

    on: {
      init: function () {
        updateCounter(this, ".dodo-fact-counter");
      },

      slideChange: function () {
        updateCounter(this, ".dodo-fact-counter");
      },
    },
  });

  $(window).on("resize", function () {
    dodoFactSlider.params.spaceBetween = designPxToViewportPx(50);
    dodoFactSlider.update();
  });
  const dodoSwiper = new Swiper(".art-dodo-swiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    initialSlide: 2,

    speed: 700,
    grabCursor: true,
    slideToClickedSlide: true,
    spaceBetween: (window.innerWidth * 1.587) / 100,

    on: {
      resize: function () {
        this.params.spaceBetween = (window.innerWidth * 1.587) / 100;
        this.update();
      },
    },

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
  const swiperMauritian = new Swiper(".mauritian-slider", {
    slidesPerView: "auto",
    speed: 4000,
    autoplay: {
      delay: 0,
    },
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      768: {
        spaceBetween: 10,
      },
      1024: {
        spaceBetween: 24,
      },
    },
  });
  const swiperExpressions = new Swiper(".expressions-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    initialSlide: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      768: {
        spaceBetween: 10,
      },
      1024: {
        spaceBetween: 24,
      },
    },
  });
});
