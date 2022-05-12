var clipboard = new ClipboardJS('.clipboard');
const tooltip = document.querySelector(".clipboard .tooltip")

clipboard.on('success', function (e) {
  tooltip.style.visibility = "visible";
  setTimeout(function() {
    tooltip.style.visibility = "hidden";
  }, 1000);

  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);

  e.clearSelection();
});

clipboard.on('error', function (e) {
  console.error('Action:', e.action);
  console.error('Trigger:', e.trigger);
});