$(document).ready(function () {

  var wikiSearchTitle = "";
  $(".loadMoreRow").hide();
  var wikiData = [];
  var indexStart = 0;
  var indexEnd = 10;
  var count = 0;
  var html = "";

  function getWiki() {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: { action: "query", list: "search", srsearch: wikiSearchTitle, prop: "revisions", rvprop: "content", srprop: "snippet", srlimit: "50", format: "json" },
      dataType: "jsonp",
      headers: { 'Api-User-Agent': 'Example/1.0' },
      success: function (data) {
        wikiData = data.query.search;
        showFirstResults();
        showResults(data);
      }
    });
  }

  function showFirstResults() {
    html += "<div class='row'><div class='col-xs-12 col-md-8 col-md-offset-2'><div class='numResults'><span class='resultsText'>&#39;";
    html += wikiData.length;
    html += "&#39;&nbsp;results found:</span ></div ></div ></div>";
    $("#searchResults").append(html);
    html = "";
    $(".loadMoreRow").hide();
  }

  function showResults(data) {
    if (wikiData.length !== 0) {
      $(".loadMoreRow").hide();
      for (var i = indexStart; i < indexEnd && indexStart < wikiData.length && i < wikiData.length; i++) {
        console.log("hello");
        html += "<div class='row resultsRow'><div class='col-xs-12 col-md-8 col-md-offset-2 resultsColumn'><div class='title'><span class='pageTitle'>";
        html += wikiData[i].title;
        html += "</span></div><div class='snippet'><span class='pageSnippet'>";
        html += wikiData[i].snippet;
        html += "...</span></div></div></div>";
        $("#searchResults").append(html);
        html = "";
      }
      indexStart += 10;
      indexEnd += 10;
      if (indexEnd > wikiData.length && indexStart >= wikiData.length) {
        $(".loadMoreRow").hide();
      } else {
        $(".loadMoreRow").show();
      }
    } else {
      $(".loadMoreRow").hide();
    }

    $(".container").addClass("containerBackground");
    $(".container").removeClass("containerCenter");
  }

  $("form").submit(function (event) {
    event.preventDefault();
    if ($("#searchField").val() !== "") {
      $("#searchResults").html("");
      wikiSearchTitle = encodeURI($("#searchField").val());
      $("#searchField").val("");
      indexStart = 0;
      indexEnd = 10;
      $(".loadMoreRow").hide();
      getWiki();
    }
  });

  $(".btn-link").click(function () {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  $("#searchClear").click(function () {
    $("#searchField").val("");
  });

  $(document).on("click", ".pageTitle", function () {
    var title = $(this).text();
    //var title = $(this).find(".pageTitle")[0].innerHTML;
    var noSpaces = title.replace(/\s/g, "_");
    var pageURL = "https://en.wikipedia.org/wiki/" + noSpaces;
    window.open(pageURL);
  });

  $(document).on("click", "#loadMore", function () {
    showResults();
  });

});