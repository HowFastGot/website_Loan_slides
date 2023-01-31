export default class ShowTips {
	constructor(trigger, tips) {
		this.btns = document.querySelectorAll(trigger);
	}

	showTip(tip) {
		tip.style.display = "block";
		this.tip.classList.remove('fadeOutDown');
		this.tip.classList.add("animated", 'fadeInUp');

	}

	hideTip(tip) {
		tip.style.display = "block";
		tip.classList.remove('fadeInUp');
		tip.classList.add("fadeOutDown");
		tip.style.display = "block";
		setTimeout(() => tip.style.display = " none", 1000 );
	}

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener("click", (e) => {
				this.tip = btn.closest(".module__info-show").nextElementSibling;
				
				if (!btn.classList.contains("pressed")) {
					this.showTip(this.tip);
					btn.classList.add("pressed");
				} else {
					this.hideTip(this.tip);
					this.btn.classList.remove("pressed");
				}
			});
		});
	}

	init() {
		this.bindTriggers();
	}
}