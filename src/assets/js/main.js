$(document).foundation();



// no widows function for header styling
$(".noWidows").each(function() {
  var wordArray = $(this).html().split(" ");
  if (wordArray.length > 1) {
      wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];

      var lastWord = wordArray.pop();
      lastWord = lastWord.replace(/.*((?:<\/\w+>)*)$/, "$1");
      $(this).html(wordArray.join(" ") + lastWord);
  }
});

// focus search input when modal opens
$('#searchModal ').bind('open.zf.reveal', function() {
  $(".ais-search-box--input").focus();
});



// clipboard.js stuff
var clip = new Clipboard('.clipboard');
var tooltipId = $("#clipboard").attr("data-toggle");
var hideTooltip = function() {
  $("#clipboard").foundation('hide');
  setTimeout($("#"+tooltipId).html("Copy link to clipboard"), 2700);
};
clip.on('success', function(e) {
    $("#"+tooltipId).html("Link copied to clipboard");
    setTimeout(hideTooltip, 2000);
    e.clearSelection();
});



// https://github.com/bfred-it/object-fit-images/
$(function () { objectFitImages() });