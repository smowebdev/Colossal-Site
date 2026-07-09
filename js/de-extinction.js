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
$(function () {
  const $wrap = $(".de-ex-hiw-inner");

  const dividers = [
    $(".divider-1"),
    $(".divider-2"),
    $(".divider-3"),
    $(".divider-4"),
    $(".divider-5"),
  ];

  const imgs = [
    $(".img-1"),
    $(".img-2"),
    $(".img-3"),
    $(".img-4"),
    $(".img-5"),
  ];

  // vị trí mặc định (%)
  let pos = [20, 40, 60, 80, 100];

  let dragging = -1;

  update();

  $(".de-divider").on("mousedown touchstart", function (e) {
    dragging = $(this).index();

    e.preventDefault();
  });

  $(document).on("mousemove touchmove", function (e) {
    if (dragging == -1) return;

    let pageX;

    if (e.type === "touchmove") pageX = e.originalEvent.touches[0].pageX;
    else pageX = e.pageX;

    let offset = $wrap.offset().left;

    let w = $wrap.width();

    let percent = ((pageX - offset) / w) * 100;

    let min = 0;
    let max = 100;

    if (dragging > 0) min = pos[dragging - 1] + 3;

    if (dragging < 4) max = pos[dragging + 1] - 3;
    percent = Math.max(min, Math.min(max, percent));
    pos[dragging] = percent;
    update();
  });
  $(document).on("mouseup touchend", function () {
    dragging = -1;
  });
  function update() {
    dividers.forEach(function ($el, i) {
      $el.css("left", pos[i] + "%");
    });
    $(".level")
      .eq(0)
      .css("left", pos[0] + "%");
    $(".level")
      .eq(1)
      .css("left", pos[1] + "%");
    $(".level")
      .eq(2)
      .css("left", pos[2] + "%");
    $(".level")
      .eq(3)
      .css("left", pos[3] + "%");
    $(".level")
      .eq(4)
      .css("left", pos[4] + "%"); // clip image 1
    imgs[0].css(
      "clip-path",
      `polygon(0 0, ${pos[0]}% 0, ${pos[0]}% 100%, 0 100%)`,
    ); // image2
    imgs[1].css(
      "clip-path",
      `polygon(${pos[0]}% 0, ${pos[1]}% 0, ${pos[1]}% 100%, ${pos[0]}% 100%)`,
    ); // image3
    imgs[2].css(
      "clip-path",
      `polygon(${pos[1]}% 0, ${pos[2]}% 0, ${pos[2]}% 100%, ${pos[1]}% 100%)`,
    ); // image4
    imgs[3].css(
      "clip-path",
      `polygon(${pos[2]}% 0, ${pos[3]}% 0, ${pos[3]}% 100%, ${pos[2]}% 100%)`,
    ); // image5
    imgs[4].css(
      "clip-path",
      `polygon(${pos[3]}% 0, 100% 0, 100% 100%, ${pos[3]}% 100%)`,
    );
  }
});
