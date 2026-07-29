jQuery(document).ready(function ($) {
  const labWorkSlider = new Swiper(".lab-work-slider", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".lab-work-next",
      prevEl: ".lab-work-prev",
    },

    on: {
      init: function () {
        updateFraction(this, ".lab-work-counter");
      },
      slideChange: function () {
        updateFraction(this, ".lab-work-counter");
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
