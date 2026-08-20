$(document).ready(function () {
  $(".location-data").each(function () {
    const $section = $(this);

    $section.find(".list .item").on("click", function () {
      const location = $(this).data("location");

      $section.find(".list .item").removeClass("active");
      $(this).addClass("active");

      $section.find(".map-ecosystem__line").removeClass("active");

      $section
        .find('.map-ecosystem__line[data-location="' + location + '"]')
        .addClass("active");
    });
  });
});
