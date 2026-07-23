jQuery(document).ready(function ($) {
  // Mission Slider - Start
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
  // Mission Slider - End

  // Rebuilding Species Active - Start
  $(".rebuilding-species-item").on("click", function () {
    if ($(this).hasClass("active")) return;

    $(".rebuilding-species-item").removeClass("active");

    $(this).addClass("active");
  });
  // Rebuilding Species Active - End

  // How It Work - Before After Image - Start
  const $hiwWrap = $(".de-ex-hiw-inner");

  const hiwDividers = [
    $(".de-ex-hiw-inner .divider-1"),
    $(".de-ex-hiw-inner .divider-2"),
    $(".de-ex-hiw-inner .divider-3"),
    $(".de-ex-hiw-inner .divider-4"),
    $(".de-ex-hiw-inner .divider-5"),
  ];

  const hiwImages = [
    $(".de-ex-hiw-inner .img-1"),
    $(".de-ex-hiw-inner .img-2"),
    $(".de-ex-hiw-inner .img-3"),
    $(".de-ex-hiw-inner .img-4"),
    $(".de-ex-hiw-inner .img-5"),
  ];

  let pos = [6, 26, 46, 66, 86];

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

    let offset = $hiwWrap.offset().left;

    let w = $hiwWrap.width();

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
    hiwDividers.forEach(function ($el, i) {
      $el.css("left", pos[i] + "%");
    });

    hiwImages[0].css(
      "clip-path",
      `polygon(0 0, ${pos[0]}% 0, ${pos[0]}% 100%, 0 100%)`,
    );
    hiwImages[1].css(
      "clip-path",
      `polygon(${pos[0]}% 0, ${pos[1]}% 0, ${pos[1]}% 100%, ${pos[0]}% 100%)`,
    );
    hiwImages[2].css(
      "clip-path",
      `polygon(${pos[1]}% 0, ${pos[2]}% 0, ${pos[2]}% 100%, ${pos[1]}% 100%)`,
    );
    hiwImages[3].css(
      "clip-path",
      `polygon(${pos[2]}% 0, ${pos[3]}% 0, ${pos[3]}% 100%, ${pos[2]}% 100%)`,
    );
    hiwImages[4].css(
      "clip-path",
      `polygon(${pos[3]}% 0, 100% 0, 100% 100%, ${pos[3]}% 100%)`,
    );
  }
  // How It Work - Before After Image - End

  // De Extinction Process - Start
  const $deProcessContainer = $(".process-container");
  const $deSteps = $(".process-step");
  const $deProcessItems = $(".process-item");

  function updateStep() {
    const scrollTop = $deProcessContainer.scrollTop();
    const checkPoint = scrollTop + $deProcessContainer.innerHeight() * 0.4;

    $deProcessItems.each(function () {
      const top = this.offsetTop;
      const bottom = top + this.offsetHeight;

      if (checkPoint >= top && checkPoint < bottom) {
        const step = $(this).data("step");

        $deSteps.removeClass("active");
        $('.process-step[data-step="' + step + '"]').addClass("active");

        return false;
      }
    });
  }

  updateStep();

  $deProcessContainer.on("scroll", updateStep);

  $deSteps.on("click", function () {
    const step = $(this).data("step");
    const target = $('.process-item[data-step="' + step + '"]')[0];

    $deProcessContainer.stop().animate(
      {
        scrollTop: target.offsetTop - 40,
      },
      600,
    );
  });

  $(".process-item").each(function () {
    const $process = $(this);

    $process.find(".process-faq-answer").hide();

    $process.find(".process-faq-item").first().addClass("active");
    $process
      .find(".process-faq-item")
      .first()
      .find(".process-faq-answer")
      .show();
  });

  $(document).on("click", ".process-faq-question", function () {
    const $item = $(this).closest(".process-faq-item");
    const $process = $item.closest(".process-item");
    const $answer = $item.find(".process-faq-answer");

    if ($answer.is(":visible")) {
      $item.removeClass("active");
      $answer.stop(true, true).slideUp(300);
    } else {
      $process.find(".process-faq-item.active").removeClass("active");

      $process
        .find(".process-faq-answer:visible")
        .stop(true, true)
        .slideUp(300);

      $item.addClass("active");
      $answer.stop(true, true).slideDown(300);
    }
  });
  // De Extinction Process - End

  // Ethics Risks Limitations  Slider - Start
  const $wrapperSlider = $(".ethics-risks-limitations-slider .swiper-wrapper");
  const $slides = $wrapperSlider.children(".swiper-slide");

  for (let i = 0; i < 1; i++) {
    $slides.clone().appendTo($wrapperSlider);
  }

  const ethicsRisksLimitationsSlider = new Swiper(
    ".ethics-risks-limitations-slider",
    {
      slidesPerView: 1.73,
      centeredSlides: true,
      loop: true,
      slideToClickedSlide: true,
    },
  );
  // Ethics Risks Limitations  Slider - End

  // Partners Tab List - Start
  const $partenerItems = $(".partners-list li");
  const $partenerContents = $(".partner-content");

  let current = 1;
  const total = $partenerItems.length;

  function updateButtons() {
    $(".partner-prev").prop("disabled", current === 1);
    $(".partner-next").prop("disabled", current === total);
  }

  function changePartner(id) {
    current = id;

    $partenerItems.removeClass("active");
    $partenerItems.filter('[data-id="' + id + '"]').addClass("active");

    $partenerContents.removeClass("active");
    $partenerContents.filter('[data-id="' + id + '"]').addClass("active");

    updateButtons();
  }

  $partenerItems.on("click", function () {
    changePartner(Number($(this).data("id")));
  });

  $(".partner-next").on("click", function () {
    if (current < total) {
      changePartner(current + 1);
    }
  });

  $(".partner-prev").on("click", function () {
    if (current > 1) {
      changePartner(current - 1);
    }
  });

  changePartner(
    $partenerItems.filter(".active").length
      ? Number($partenerItems.filter(".active").data("id"))
      : 3
  );
  // Partners Tab List - End
});
