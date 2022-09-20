var clipboard = new ClipboardJS('.clipboard');

clipboard.on('success', function (e) {
  window.dispatchEvent(new CustomEvent('flash'));
});

// prevent scroll when mobile nav open
function bsd(status) {
	var body = document.querySelector("body");

	var scrollTop = window.scrollY || document.documentElement.scrollTop;
	var scrollLeft = window.scrollX || document.documentElement.scrollLeft;

	window.onscroll = function () {};

	if (status === true) {
		// Check window scroll exists else use traditional method
		if (window.onscroll !== null) {
			// if any scroll is attempted, set this to the previous value
			window.onscroll = function () {
				window.scrollTo(scrollLeft, scrollTop);
			};
		}
	} else {
		//body.classList.remove("fixed", "overflow-y-scroll");
		window.onscroll = function () {};
	}
}
