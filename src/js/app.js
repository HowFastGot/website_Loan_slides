import MainSlider from "./modules/slider/mainSlider.js";
import MiniSlider from "./modules/slider/miniSlider.js";
import VideoPlayer from "./modules/VideoPlayer.js";
import Differences from "./modules/differences.js";
import Forms from "./modules/forms.js";
import ShowTips from "./modules/showInfo.js";
import DownloadFiles from "./modules/downloadFiles.js";

window.addEventListener("DOMContentLoaded", function(e) {

	const mainSlider = new MainSlider({btns:".next", container:".page"});
	mainSlider.render();

	const modulePageSlider = new MainSlider({
		container: ".moduleapp",
		btns: ".next",
		next: ".nextmodule",
		prev: ".prevmodule"
	});
	modulePageSlider.render();

	const miniSlider = new MiniSlider({
		container:".showup__content-slider", 
		next: ".showup__content .showup__next",
		prev: ".showup__content .showup__prev",
		classActive: "card-active",
		animate: true
	});
	miniSlider.init();

	const modulesSlider = new MiniSlider({
		container:".modules__content-slider", 
		next: ".modules__info-btns .slick-next",
		prev: ".modules__info-btns .slick-prev",
		classActive: "card-active",
		animate: true, 
		autoplay: true
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		container:".feed__slider", 
		next: ".feed__slider .slick-next",
		prev: ".feed__slider .slick-prev",
		classActive: "feed__item-active",
	});
	feedSlider.init();

	new VideoPlayer(".showup__video .play", ".overlay", ".close").init();
	new VideoPlayer(".module__video-item .play", ".overlay", ".close").init();

	new Differences(".officerold", ".officernew", ".officer__card-item").init();
	new Forms("form", "./assets/question.php").init();
	new ShowTips(".module__info-show .plus").init();
	new DownloadFiles(".module__info-book .download").init();
});