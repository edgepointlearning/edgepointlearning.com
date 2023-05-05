import Alpine from 'alpinejs'
// import 'sharer.js'
import ClipboardJS from 'clipboard'
import './lite-youtube.js'
import "./vi-lazyload.js";
// smart sticky nav:
// import "./sticky-nav.js";

// clipboardJS
var clipboard = new ClipboardJS('.clipboard');
clipboard.on('success', function (e) {
  window.dispatchEvent(new CustomEvent('flash'));
});

// Alpine
window.Alpine = Alpine
Alpine.start()