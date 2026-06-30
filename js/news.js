jQuery(document).ready(function ($) {
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
});
