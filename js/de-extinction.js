jQuery(document).ready(function ($) {
  const missionSlider = new Swiper(".de-ex-mission-slider", {
    slidesPerView: "auto",
    spaceBetween: 16,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,

    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: false,
    //   pauseOnMouseEnter: true,
    // },

    speed: 600,
  });
  $(".rebuilding-species-item").on("click", function () {
    if ($(this).hasClass("active")) return;

    $(".rebuilding-species-item").removeClass("active");

    $(this).addClass("active");
  });
});
