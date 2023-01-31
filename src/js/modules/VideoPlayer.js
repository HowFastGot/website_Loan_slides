export default class VideoPlayer {
	constructor(btns, block, close) {
		this.btns = document.querySelectorAll(btns);
		this.block = document.querySelector(block);
		this.close = document.querySelector(close);
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
	}

	createPlayer(url) {
		this.frame = new YT.Player('frame', {
          height: '100%',
          width: '100%',
          videoId: `${url}`,
          events: {
		      'onStateChange': this.onPlayerStateChange
		     }
		});
	}

	onPlayerStateChange(state) {
		try {
			const blockedElem = this.activeBtn.closest(".module__video-item").nextElementSibling;
			const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);
			
			if (state.data === 0) {
				blockedElem.style.filter = "none";
				blockedElem.style.opacity = "1";
				blockedElem.querySelector(".play__circle").classList.remove("closed");
				blockedElem.querySelector(".play__circle").querySelector("svg").remove();
				blockedElem.querySelector(".play__circle").append(playBtn);
				blockedElem.querySelector(".play__circle").nextElementSibling.classList.remove("attention");
				blockedElem.querySelector(".play__circle").nextElementSibling.textContent = "Play video";

				blockedElem.setAttribute("data-disabled", "false");
			}
		} catch(e) {}
	}
	bindTriggers() {
			this.btns.forEach( (btn, i) => {
				if (document.querySelector(".module__video-item")) {
					const blockedElem = btn.closest(".module__video-item").nextElementSibling;

					if (i % 2) {
						btn.closest(".module__video-item").setAttribute("data-disabled", "true");
					}
				}

				btn.addEventListener("click", (e) => {

					if (btn.closest(".showup__video") || btn.closest(".module__video-item").getAttribute("data-disabled") !== "true" || btn.closest(".showup__video")) {
						this.activeBtn = btn;
						this.block.style.display ="flex";

						if (document.querySelector("iframe#frame")) {
							if (this.path !== btn.getAttribute("data-url")) {
								this.path = btn.getAttribute("data-url");
								this.frame.loadVideoById({videoId: this.path}); // загружать другое видео
							}
						} else {
							this.path = btn.getAttribute("data-url");
							this.createPlayer(this.path);
						}
					}
			});
		});
	}

	bindClose() {
		this.close.addEventListener("click", (e) => {
			this.block.style.display = "none";
			this.frame.stopVideo();
		});
	}

	init() {
		if (this.btns.length > 0) {

			const tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			this.bindTriggers();
			this.bindClose();
		}
	}
}