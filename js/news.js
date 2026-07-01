jQuery(document).ready(function ($) {
  // Species Project - Start
  const $navigationWrapper = $(".spec-project-content .nav-wrapper");
  const $navigationList = $(".spec-project-content .nav-inner");
  const $projectNavItems = $(".spec-project-item");
  const $projectPanels = $(".spec-project-panel");
  const $projectButton = $(".spec-project-btn");

  function updateNavOpacity(activeIndex) {
    const maxDistance = 3;

    $projectNavItems.each(function (index) {
      const distance = Math.abs(index - activeIndex);

      let opacity;

      if (distance === 0) {
        opacity = 1;
      } else if (distance === 1) {
        opacity = 0.4;
      } else {
        opacity = 0.4 * (1 - (distance - 1) / (maxDistance - 1));
      }

      opacity = Math.max(0.1, Math.min(1, opacity));

      $(this).css("opacity", opacity);
    });
  }

  function centerActiveNavItem($activeItem) {
    const wrapperHeight = $navigationWrapper.height();

    const itemTop = $activeItem.position().top;
    const itemHeight = $activeItem.outerHeight();

    const targetY = wrapperHeight / 2 - itemHeight / 2;
    const translateY = targetY - itemTop - itemHeight / 2;

    $navigationList.css({
      transform: `translateY(${translateY}px)`,
      transition: "0.4s ease",
    });
  }

  function changeProject(index) {
    const $activeItem = $projectNavItems.eq(index);
    const projectId = $activeItem.data("id");

    $projectNavItems.removeClass("active");
    $activeItem.addClass("active");

    centerActiveNavItem($activeItem);

    $projectPanels.removeClass("active").hide();

    const $activePanel = $projectPanels.filter(`[data-id="${projectId}"]`);
    $activePanel.addClass("active").fadeIn(200);

    $projectButton.find("span").text($activeItem.data("btn"));
    $projectButton.attr("href", $activeItem.data("link"));

    updateNavOpacity(index);
  }

  $projectNavItems.on("click", function () {
    changeProject($(this).index());
  });

  const defaultProjectIndex = Math.ceil($projectNavItems.length / 2) - 1;
  changeProject(defaultProjectIndex);

  $(window).on("resize", function () {
    const activeIndex = $projectNavItems.filter(".active").index();
    centerActiveNavItem($projectNavItems.eq(activeIndex));
  });

  const projectGallerySwipers = [];

  $(".species-inner-slider").each(function () {
    const swiper = new Swiper(this, {
      slidesPerView: 2,
      spaceBetween: 32,
      speed: 500,
      observer: true,
      observeParents: true,
    });

    projectGallerySwipers.push(swiper);
  });
  // Species Project - End

  // Featured Video - Start
  $(".news-features-video").each(function () {
    const $box = $(this);
    const $video = $box.find(".video-player");
    const $play = $box.find(".video-play");
    const video = $video[0];

    $play.on("click", function () {
      video.controls = true;

      const promise = video.play();

      if (promise !== undefined) {
        promise.then(() => {
          $box.addClass("playing");
        });
      } else {
        $box.addClass("playing");
      }
    });

    $video.on("pause", function () {
      if (this.seeking) return;
      if (!video.ended) {
        video.controls = false;
        $box.removeClass("playing");
      }
    });

    $video.on("ended", function () {
      video.controls = false;
      video.currentTime = 0;

      $box.removeClass("playing");
    });
  });
  // Featured Video - End
});
