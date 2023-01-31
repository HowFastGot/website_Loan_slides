export default class DownloadFiles {
	constructor(triggers) {
		this.btns = document.querySelectorAll(triggers);
		this.path = "./assets/img/mainbg.jpg";
	}

	dowloadItem(path) {
		const link = document.createElement("a");
		link.setAttribute("href", path);
		link.setAttribute("download", "Image");

		link.style.display = "none";
		document.body.append(link);
		link.click();

		link.remove();
	}

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener("click", (e) => {
				e.stopPropagation();
				this.dowloadItem(this.path);
			});
		});
	}

	init() {
		this.bindTriggers();
	}
}