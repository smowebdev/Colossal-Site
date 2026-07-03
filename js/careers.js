$(function () {
  const $careerGroups = $(".career-group");
  const $careerItems = $(".career-item");

  $careerGroups.removeClass("active");
  $careerGroups.find(".career-body").hide();
  $careerGroups.find(".career-toggle").html("+");

  $careerGroups.first().addClass("active");
  $careerGroups.first().find(".career-body").show();
  $careerGroups.first().find(".career-toggle").html("−");

  function updateCareerCount(searching = false) {
    const total = searching
      ? $(".career-item.matched").length
      : $careerItems.length;

    $(".count-number").text(`(${total})`);
  }

  $(".career-header").on("click", function () {
    const $group = $(this).closest(".career-group");

    if ($group.hasClass("active")) {
      $group.removeClass("active");

      $group.find(".career-body").stop(true, true).slideUp(300);

      $group.find(".career-toggle").html("+");

      return;
    }

    $careerGroups
      .removeClass("active")
      .find(".career-body")
      .stop(true, true)
      .slideUp(300);

    $careerGroups.find(".career-toggle").html("+");

    $group.addClass("active");

    $group.find(".career-body").stop(true, true).slideDown(300);

    $group.find(".career-toggle").html("−");
  });

  $(".job-search").on("input", function () {
    const keyword = $(this).val().toLowerCase().trim();

    if (keyword === "") {
      $careerItems.show().removeClass("matched");

      $careerGroups.show();

      $careerGroups.removeClass("active");

      $careerGroups.find(".career-body").hide();

      $careerGroups.find(".career-toggle").html("+");

      $careerGroups.first().addClass("active");

      $careerGroups.first().find(".career-body").show();

      $careerGroups.first().find(".career-toggle").html("−");

      updateCareerCount(false);
      return;
    }

    $careerItems.removeClass("matched");

    $careerGroups.each(function () {
      const $group = $(this);
      let hasResult = false;

      const groupTitle = $group
        .find(".career-header__title")
        .first()
        .text()
        .toLowerCase();

      $group.find(".career-item").each(function () {
        const $item = $(this);

        const text = [
          groupTitle,
          $item.find(".career-title").text(),
          $item.find(".career-description").text(),
          $item.find(".career-location").text(),
        ]
          .join(" ")
          .toLowerCase();

        if (text.includes(keyword)) {
          $item.show().addClass("matched");
          hasResult = true;
        } else {
          $item.hide().removeClass("matched");
        }
      });

      if (hasResult) {
        $group.show();

        $group.addClass("active");

        $group.find(".career-body").show();

        $group.find(".career-toggle").html("−");
      } else {
        $group.hide();
      }
    });

    updateCareerCount(true);
  });

  updateCareerCount(false);
});
