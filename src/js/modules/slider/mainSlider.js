import Slider from "./slider.js";

export default class MainSlider extends Slider {
     constructor(btns, next, prev) {
          super(btns, next, prev);
     }

     checkIsBlock(n) {
          try {
               if (n === 3) {
                    this.hanson.style.display = "none";
                    this.hanson.classList.add("animated", "fadeInUp");
                    setTimeout(() => this.hanson.style.display = "block", 3000);
               } else {
                    this.hanson.classList.remove("animated", "fadeInUp");
               }
          } catch (e) {
               console.log(`Блок 'hanson' не найден на слайде ! Ошибка: ${e.message} `)
          }
     }

     showSlides(n) {
          if (n > this.slides.length) {
               this.slideIndex = 1;
          }

          if (n < 1) {
               this.slideIndex = this.slides.length;
          }

          this.checkIsBlock(n) // проверяем на каком слайде и стоит ли показать блок "Hanson"

          Array.from(this.slides).forEach(slide => {
               slide.style.display = "none";
          });

          this.slides[this.slideIndex - 1].style.display = "block";
     }

     plusSlides(n) {
          this.showSlides(this.slideIndex += n);
     }

     bindTriggers(buttons) {
          buttons.forEach(button => {
               button.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (button.closest(".prevmodule")) {
                         this.plusSlides(-1);
                    } else {
                         this.plusSlides(1);
                    }
               });
          });
     }

     render() {
          if (this.container) {
               this.hanson = document.querySelector(".hanson");

               this.btns.forEach(btn => {
                    btn.addEventListener("click", (e) => {
                         e.preventDefault();

                         this.plusSlides(1);
                    });

                    btn.parentNode.previousElementSibling.addEventListener("click", (e) => {
                         e.preventDefault();
                         this.slideIndex = 1;
                         this.showSlides(this.slideIndex);
                    });
               });

               this.bindTriggers(this.next)
               this.bindTriggers(this.prev)

               this.showSlides(this.slideIndex);
          }
     }
}