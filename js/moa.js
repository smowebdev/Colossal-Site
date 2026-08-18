$(document).ready(function () {
  $(".distribution-item").on("click", function () {
    const $item = $(this);
    const image = $item.data("image");
    const name = $item.data("name");

    const $distribution = $item.closest(".distribution");
    const $map = $distribution.find(".img-map");
    const $value = $distribution.find(".image-caption .value");

    $(".distribution-item").removeClass("active");
    $item.addClass("active");

    $map.stop(true, true).fadeOut(200, function () {
      $map.attr("src", image);
      $map.attr("alt", name);

      $map.fadeIn(300);
    });

    $value.stop(true, true).fadeOut(150, function () {
      $(this)
        .text("[ " + name + " ]")
        .fadeIn(200);
    });
  });
});
