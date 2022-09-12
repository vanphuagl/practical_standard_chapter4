$(document).ready(function () {
  let arrayCurrent = [];

  $(".c-btn__list").change(function () {
    let value = $(this).val();
    // console.log("value", value);

    let content = $("#select").find("option:selected").text();
    $(".c-btn.c-btn--small").text(content);

    let base_url = window.location.href;
    // console.log('base_url', base_url)

    // link href button
    if (value === "all") {
      $("a.c-btn.c-btn--small").attr("href", base_url + "topics");
    } else {
      $("a.c-btn.c-btn--small").attr("href", base_url + "category/" + content);
    }

    // loading
    $("ul#listpost > li").addClass("is-hidden");
    $("#listpost").append(`
        <div class="c-loading">
            <div class="loader"></div>
        </div>
    `);

    if (value) {
      if ($.inArray(value, arrayCurrent) === -1) {
        arrayCurrent = [];
        arrayCurrent.push(value);
        // console.log("arrayCurrent", arrayCurrent);
        getListCurrent(arrayCurrent);
      }
    } else {
      if ($.inArray(value, arrayCurrent) !== -1) {
        arrayCurrent = arrayCurrent.filter((item) => item != value);
        getListCurrent(arrayCurrent);
      }
    }
  });

  function getListCurrent(arrayCurrent) {
    let link = "";
    $(".c-loading").addClass("active");

    if (arrayCurrent.toString() == "all") {
      link = "http://localhost/task27/wp-json/wp/v2/posts?per_page=5";
      // link = "http://103.77.160.168/~aglstaff/nguyenvanphu/task27/wp-json/wp/v2/posts?per_page=5";
    } else if (arrayCurrent.length > 0) {
      link =
        "http://localhost/task27/wp-json/wp/v2/posts?categories=" +
        arrayCurrent.toString() +
        "&per_page=5";
      // link = "http://103.77.160.168/~aglstaff/nguyenvanphu/task27/wp-json/wp/v2/posts?categories=" + arrayCurrent.toString() + "&per_page=5";
    } else {
      link = "http://localhost/task27/wp-json/wp/v2/posts?per_page=5";
      // link = "http://103.77.160.168/~aglstaff/nguyenvanphu/task27/wp-json/wp/v2/posts?per_page=5";
    }

    $.ajax({
      url: link,
      success: function (result) {
        // console.log("result", result);

        $(".c-loading").removeClass("is-active");
        $("ul#listpost > li").removeClass("is-hidden");

        $("#listpost").empty();
        for (let i = 0; i < result.length; i++) {
          let text = "";
          let item = result[i];
          let dateTime = item.date.substring(0, 10);
          let dateReplace = dateTime.replace("-", "/");
          let date = dateReplace.replace("-", "/");

          text += `<li>
                <span class="datepost">${date}</span>`;
          for (let j = 0; j < item.categories.length; j++) {
            text += `<a class="c-label" href="${item.categories[j].category_link}">${item.categories[j].category_name}</a>`;
          }
          text += `<a href="${item.link}"> ${item.title.rendered} </a>
                </li>`;
          $("#listpost").append(text);

          //   for (let j = 0; j < item.categories.length; j++) {
          //     $("#listpost").append(`
          //         <li>
          //             <span class="datepost">${date}</span>
          //             <a class="c-label" href="${item.categories[j].category_link}">${item.categories[j].category_name}</a>
          //             <a href="${item.link}"> ${item.title.rendered}</a>
          //         </li>
          //     `)
          //   }
        }
        // $("#listpost").empty();
        // $("#listpost").append(result.length);
      },
    });
  }
  getListCurrent(arrayCurrent);
});
