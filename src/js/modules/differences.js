export default class Differences {
	constructor(oldofficer, newofficer, items) {
		try {
			this.oldofficer = document.querySelector(oldofficer);
			this.newofficer = document.querySelector(newofficer);
			this.oldItems = this.oldofficer.querySelectorAll(items);
			this.newItems = this.newofficer.querySelectorAll(items);
			this.oldCounter = 0;
			this.newCounter = 0;
		} catch(e){}
	}

	bindTriggers(container, items, counter) {
		container.querySelector(".plus").addEventListener("click", (e) => {
			if (counter !== items.length - 2) {
				items[counter].style.display = "flex";
				counter++;
			} else {
				items[counter].style.display = "flex";
				items[++counter].remove();
			}
		});
	}

	hideItems(items) {
		items.forEach((item, i, arr) => {
			if (i !== arr.length - 1) {
				item.style.display = "none";
			}
		});

		items.forEach((item, i, arr) => {
			if (i !== arr.length - 1) {
				item.style.display = "none";
			}
		});
	}

	init() {
		try {
			this.hideItems(this.newItems);
			this.hideItems(this.oldItems);
			this.bindTriggers(this.oldofficer, this.oldItems, this.oldCounter);
			this.bindTriggers(this.newofficer, this.newItems, this.newCounter);
		} catch(e){}
	}
}