var clipboard = new ClipboardJS('.clipboard');

clipboard.on('success', function (e) {
  window.dispatchEvent(new CustomEvent('flash'));
});