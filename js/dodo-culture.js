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
});
