/**
 * An updated version of the `lite-vimeo` web component
 *
 * @link https://github.com/slightlyoff/lite-vimeo
 */
class LiteVimeo extends HTMLElement {
	/**
	 * The Shadow DOM Root
	 *
	 * @type {ShadowRoot}
	 */
	shadowRoot;

	/**
	 * Whether the iframe has been loaded
	 * @type {boolean}
	 */
	iframeLoaded = false;

	/**
	 * The `div#frame` of the shadowDOM that the iframe will be inserted into
	 *
	 * @type {HTMLDivElement}
	 */
	domRefFrame;

	/**
	 * The `img` elements of the shadowDOM that will be used as placeholders
	 * @type {{fallback: HTMLImageElement, webp: HTMLSourceElement, jpeg: HTMLSourceElement}}
	 */
	domRefImg;

	/**
	 * The play button element
	 * @type {HTMLButtonElement}
	 */
	domRefPlayButton;

	/**
	 * The private hash for unlisted videos
	 *
	 * @type {string|undefined}
	 */
	hash = undefined;

	/**
	 * Whether the Vimeo assets have been preconnected
	 *
	 * @type {boolean}
	 */
	static preconnected = false;

	constructor() {
		super();
		this.setupDom();
	}

	static get observedAttributes() {
		return ['videoid', 'aspectratio'];
	}

	connectedCallback() {
		this.addEventListener('pointerover', LiteVimeo.warmConnections, {
			once: true,
		});

		this.addEventListener('click', () => this.addIframe());
	}

	get isUnlisted() {
		return this.hasAttribute('unlisted');
	}

	get enableTracking() {
		return this.hasAttribute('enabletracking');
	}

	get hasCustomPlaceholder() {
		return this.hasAttribute('customplaceholder');
	}

	get customPlaceholder() {
		return this.getAttribute('customplaceholder') || '';
	}

	get videoId() {
		const videoId = this.getAttribute('videoid');
		if (!videoId) {
			return '';
		}
		if (this.isUnlisted) {
			const [vimeoId, privateHash] = videoId.split('/');
			this.hash = privateHash;
			return vimeoId;
		}
		return videoId;
	}

	get loop() {
		return this.hasAttribute('loop');
	}
  
  // Getter and setter for the aspect ratio
  get aspectRatio() {
    return this.getAttribute('aspectratio') || '16/9'; // Default to 16/9
  }
  set aspectRatio(value) {
    this.setAttribute('aspectratio', value);
  }

	/**
	 * Set the video ID
	 * @param {string} id
	 */
	set videoId(id) {
		this.setAttribute('videoid', id);
	}

	get videoPlay() {
		return this.getAttribute('videoplay') || 'Play';
	}

	/**
	 * Alters the "Play" button text
	 * @param {string} name
	 */
	set videoPlay(name) {
		this.setAttribute('videoplay', name);
	}

	/**
	 * Get the title of the video
	 * @returns {string} the video title or "Video"
	 */
	get videoTitle() {
		return this.getAttribute('videotitle') || 'Video';
	}

	/**
	 * Set the title of the video
	 *
	 * @param {string} title the title of the video
	 */
	set videoTitle(title) {
		this.setAttribute('videotitle', title);
	}

	/**
	 * Get the start time of the video
	 * @returns {string} the start time or "0s"
	 */
	get videoStartAt() {
		return this.getAttribute('start');
	}

	/**
	 * Set the start time of the video
	 * @param {string} time the start time of the video
	 */
	set videoStartAt(time) {
		this.setAttribute('start', time);
	}

	/**
	 * Get the autoLoad property
	 * @returns {boolean} the autoLoad property
	 */
	get autoLoad() {
		return this.hasAttribute('autoload');
	}

	/**
	 * Alters the autoLoad property
	 *
	 * @param {boolean} value
	 */
	set autoLoad(value) {
		if (value) {
			this.setAttribute('autoload', '');
		} else {
			this.removeAttribute('autoload');
		}
	}

	/**
	 * Get the autoPlay property
	 * @returns {boolean} the autoPlay property
	 */
	get autoPlay() {
		return this.hasAttribute('autoplay');
	}

	/**
	 * Alters the autoPlay property
	 *
	 * @param {boolean} value
	 */
	set autoPlay(value) {
		if (value) {
			this.setAttribute('autoplay', 'autoplay');
		} else {
			this.removeAttribute('autoplay');
		}
	}

	/**
	 * Define our shadowDOM for the component
	 */
	setupDom() {
		const shadowDom = this.attachShadow({ mode: 'open' });
		shadowDom.innerHTML = this.addStyles() + this.addPictureElement();
		this.domRefFrame = shadowDom.querySelector('#frame');
		this.domRefImg = {
			fallback: shadowDom.querySelector('#fallbackPlaceholder'),
			webp: shadowDom.querySelector('#webpPlaceholder'),
			jpeg: shadowDom.querySelector('#jpegPlaceholder'),
		};
		this.domRefPlayButton = shadowDom.querySelector('.lvo-playbtn');
	}

	/** Add CSS to ShadowDOM Element
	 * @returns {string} the CSS
	 */
	addStyles() {
		const styles = ` <style>
        :host {
          contain: content;
          display: block;
          position: relative;
          width: 100%;
          aspect-ratio: ${this.aspectRatio}; // Use the aspectRatio getter
        }

        #frame, #fallbackPlaceholder, iframe, #custom-placeholder {
          position: absolute;
          height:100%;
          width:100%;
        }

        #frame {
          cursor: pointer;
        }
		#fallbackPlaceholder, #custom-placeholder {
			object-fit: cover;
		}

	  #frame::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		${this.hasCustomPlaceholder ? '' : 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);'}
		background-position: top;
		height: 60px;
		padding-bottom: 50px;
		width: 100%;
		transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
		z-index: 1;
	  }
	  /* play button */
	  .lvo-playbtn {
		width: 70px;
		height: 46px;
		background-color: #212121;
		z-index: 1;
		opacity: 0.8;
		border-radius: 10%;
		transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
		border: 0;
	  }
	  #frame:hover .lvo-playbtn {
		background-color: rgb(98, 175, 237);
		opacity: 1;
		cursor: pointer;
	  }
	  /* play button triangle */
	  .lvo-playbtn:before {
		content: '';
		border-style: solid;
		border-width: 11px 0 11px 19px;
		border-color: transparent transparent transparent #fff;
	  }
	  .lvo-playbtn,
	  .lvo-playbtn:before {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
	  }

	  /* Post-click styles */
	  .lvo-activated {
		cursor: unset;
	  }

	  #frame.lvo-activated::before,
	  .lvo-activated .lvo-playbtn,
	  .lvo-activated picture {
		display: none;
	  }
	}
    </style>`;
		return styles;
	}

	/**
	 * Adds the video placeholder image to the shadowDOM player, and conditionally renders the play button if a custom placeholder is provided
	 * @returns {string} the HTML
	 */
	addPictureElement() {
		const picture = `<div id="frame"><picture>
        ${
			this.hasCustomPlaceholder
				? `<img id="custom-placeholder"
				src="${this.customPlaceholder}"
				decoding="async"
				loading="lazy" />`
				: `
		<source id="webpPlaceholder" type="image/webp">
		<source id="jpegPlaceholder" type="image/jpeg">
		<img id="fallbackPlaceholder"
			 referrerpolicy="origin"
			 width="1100"
			 height="619"
			 decoding="async"
			 loading="lazy" />
	  `
		}
		</picture><button class="lvo-playbtn"></button>
      </div>`;
		return picture;
	}

	/**
	 * Parse our attributes and fire up some placeholders
	 */
	setupComponent() {
		this.initImagePlaceholder();

		this.setAttribute('title', `${this.videoPlay}: ${this.videoTitle}`);

		this.domRefPlayButton.setAttribute(
			'aria-label',
			`${this.videoPlay}: ${this.videoTitle}`
		);

		if (this.autoLoad) {
			this.initIntersectionObserver();
		}
	}

	/**
	 * Lifecycle method that we use to listen for attribute changes to period
	 * @param {string} name
	 * @param {unknown} oldVal
	 * @param {unknown} newVal
	 *
	 * @returns {void}
	 */
	attributeChangedCallback(name, oldVal, newVal) {
		switch (name) {
			case 'videoid':
				if (oldVal !== newVal) {
					this.setupComponent();
					// if we have a previous iframe, remove it and the activated class
					if (this.domRefFrame.classList.contains('lvo-activated')) {
						this.domRefFrame.classList.remove('lvo-activated');
						this.shadowRoot?.querySelector('iframe').remove();
					}
				}
				break;
      case 'aspectratio':
        this.updateAspectRatio();
        break;
			default:
				break;
		}
	}

  // Method to update the aspect ratio
  updateAspectRatio() {
    this.style.aspectRatio = this.aspectRatio;
  }

	/**
	 * Inject the iframe into the component body
	 */
	addIframe() {
		if (!this.iframeLoaded) {
			const queryParams = this.getIFrameParams();
			const url =
				`/video/${this.videoId}` +
				(this.isUnlisted
					? `?h=${this.hash}&${queryParams}`
					: `?${queryParams}`);

			const srcUrl = new URL(url, 'https://player.vimeo.com/');

			const iframeHTML = `
		<iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" allowfullscreen autoplay="true" ${
			this.autoPlay ? `muted="true"` : ''
		} src="${srcUrl}"></iframe>`;
			this.domRefFrame.insertAdjacentHTML('beforeend', iframeHTML);
			this.domRefFrame.classList.add('lvo-activated');
			this.iframeLoaded = true;
		}
	}

	/**
	 * Gets the Vimeo iFrame src parameters
	 * @returns {string} the iframe parameters
	 */
	getIFrameParams() {
		return `hd=1&autohide=1&autoplay=1${this.loop ? '&loop=1' : ''}${this.enableTracking ? '' : '&dnt=1'}${this.autoPlay ? '&muted=1' : ''}${this.videoStartAt ? `&#t=${this.videoStartAt}` : ''}`;
	}

	/**
	 * Setup the placeholder image for the component
	 *
	 * @returns {Promise<any>|void}
	 */
	initImagePlaceholder = async () => {
		if (this.isUnlisted) {
			return;
		}

		// we don't know which image type to preload, so warm the connection
		LiteVimeo.preconnected
			? null
			: LiteVimeo.addPrefetch('preconnect', 'https://i.vimeocdn.com/');

		const apiUrl = `https://vimeo.com/api/v2/video/${this.videoId}.json`;
		const apiResponse = (await (await fetch(apiUrl)).json())[0];
		const tnLarge = apiResponse.thumbnail_large;
		const imgId = tnLarge
			.substr(tnLarge.lastIndexOf('/') + 1)
			.split('_')[0];

		const posterUrlWebp = `https://i.vimeocdn.com/video/${imgId}.webp?mw=1100&mh=619&q=70`;
		const posterUrlJpeg = `https://i.vimeocdn.com/video/${imgId}.jpg?mw=1100&mh=619&q=70`;
		this.domRefImg.webp.srcset = posterUrlWebp;
		this.domRefImg.jpeg.srcset = posterUrlJpeg;
		this.domRefImg.fallback.src = posterUrlJpeg;
		this.domRefImg.fallback.setAttribute(
			'aria-label',
			`${this.videoPlay}: ${this.videoTitle}`
		);
		this.domRefImg.fallback.setAttribute(
			'alt',
			`${this.videoPlay}: ${this.videoTitle}`
		);
	};

	/**
	 * Setup the Intersection Observer to load the iframe when scrolled into view
	 *
	 * @returns {void}
	 */
	initIntersectionObserver() {
		if (
			'IntersectionObserver' in window &&
			'IntersectionObserverEntry' in window
		) {
			const options = {
				root: null,
				rootMargin: '0px',
				threshold: 0,
			};

			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !this.iframeLoaded) {
						LiteVimeo.warmConnections();
						this.addIframe();
						observer.unobserve(this);
					}
				});
			}, options);

			observer.observe(this);
		}
	}

	/**
	 * Add a <link rel={preload | preconnect} ...> to the head
	 * @param {string} kind the kind of link to add
	 * @param {string} url the source URL
	 * @param {?string} as the "as" attribute
	 *
	 * @returns {void}
	 */
	static addPrefetch(kind, url, as = null) {
		const linkElem = document.createElement('link');
		linkElem.rel = kind;
		linkElem.href = url;
		if (as) {
			linkElem.as = as;
		}
		linkElem.crossOrigin = 'true';
		document.head.append(linkElem);
	}

	/**
	 * Begin preconnecting to warm up the iframe load Since the embed's network
	 * requests load within its iframe, preload/prefetch'ing them outside the
	 * iframe will only cause double-downloads. So, the best we can do is warm up
	 * a few connections to origins that are in the critical path.
	 *
	 * Maybe `<link rel=preload as=document>` would work, but it's unsupported:
	 * http://crbug.com/593267 But TBH, I don't think it'll happen soon with Site
	 * Isolation and split caches adding serious complexity.
	 *
	 * @returns {void}
	 */
	static warmConnections() {
		if (LiteVimeo.preconnected) return;
		const vimeoAssets = {
			preconnect: [
				'https://f.vimeocdn.com',
				'https://player.vimeo.com',
				'https://i.vimeocdn.com',
			],
		};
		Object.entries(vimeoAssets).forEach(([kind, urls]) => {
			urls.forEach((url) => LiteVimeo.addPrefetch(kind, url));
		});

		LiteVimeo.preconnected = true;
	}
}

customElements.define('lite-vimeo', LiteVimeo);
module.exports = LiteVimeo;