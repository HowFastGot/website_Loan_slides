import Slider from "./slider.js";

export default class MiniSlider extends Slider {
	constructor(container, next, prev, animate, classActive,autoplay) {
		super(container, next, prev, animate, classActive, autoplay);
	}

	decorizeSlides() {
		for (let i = 0; i < this.slides.length; i++) {
			try {
				this.slides[i].classList.remove(this.classActive);
			} catch {};
			

			if (this.animate) {
				this.slides[i].querySelector(".card__title").style.opacity = "0.4";
				this.slides[i].querySelector(".card__controls-arrow").style.opacity = "0";
			}
		}

		try {
			if (this.slides[1].tagName === "BUTTON" && this.slides[2].tagName === "BUTTON") {
				this.slides[0].classList.add(this.classActive);
				this.container.append(this.slides[1], this.slides[2]);
			} else {
				this.slides[0].classList.add(this.classActive);
			}
		} catch {}

		if (this.animate) {
			this.slides[0].querySelector(".card__title").style.opacity = "1";
			this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
		}
	}

	showNextSlide() {
		this.container.append(Array.from(this.slides)[0]);
		this.decorizeSlides();
	}

	startAutoplay() {
		let interval = setInterval(() => this.showNextSlide(), 5000) ;

		this.slides[0].parentElement.addEventListener("mouseenter", () => clearInterval(interval));
	}

	bindTriggers() {

		this.next.forEach(item =>{
			item.addEventListener("click", () => this.showNextSlide());
		});
		

		this.prev.forEach(item =>{
			item.addEventListener("click",  () => {
				if (Array.from(this.slides).at(-1).tagName == "BUTTON" && Array.from(this.slides).at(-2).tagName == "BUTTON") {
					this.container.prepend(Array.from(this.slides).at(-3));
				} else {
					this.container.prepend(Array.from(this.slides).at(-1));
				}
				this.decorizeSlides();
			});
		})
	}

	init() {
		try {
			this.container.style.cssText = `
				display: flex;
				flex-wrap: wrap;
				align-items: flex-start;
				overflow: hidden; 
			`;

			this.bindTriggers();
			this.decorizeSlides();

			if (this.autoplay) {
				this.startAutoplay();

				this.slides[0].parentElement.addEventListener("mouseleave", () => this.startAutoplay());
			}
		} catch(e) {}
	}
}