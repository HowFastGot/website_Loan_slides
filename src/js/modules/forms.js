export default class Forms {
	constructor(forms, url) {
		this.forms = document.querySelectorAll(forms);
		this.url = url;
		this.inputs = document.querySelectorAll("input");
		this.message = {
			loading: "Идет загрузка...",
			ok: "Cпасибо, скоро с Вами свяжется менеджер!",
			error: "Что то пошло не так..."
		}
	}

	async postData(url, data) {
		let res = await fetch(url, {
			method: "POST",
			body: data
		});

		return res.text();
	}

	clearInputs() {
		this.inputs.forEach(input => {
			input.value = "";
		});
	}

	checkEmailInputs(selector) {
		const emailInputs = document.querySelectorAll(selector);

		emailInputs.forEach(item => {
			item.addEventListener("keypress", (e) => {
				if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
					e.preventDefault()
				}
			});
		});
	}

	initMask() {

		let cursorPosition = (pos, elem) => {
			elem.focus();

			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
				elem.focus();
			} else if (elem.createTextRange) {
				let range = new Range();

				range.collapse(true);
				range.setStart(pos);
				range.setEnd(pos);
				range.select();
			}
		};

		function createMask(event) {

			let matrix = "+1 (___) ___-____",
				 i = 0,
				 diff = matrix.replace(/\D/g, ""),
				 val = this.value.replace(/\D/g, "");

				 if (diff.length > val.length) {
				 	val = diff;
				 }

				this.value = matrix.replace(/./g, function(a) {
					if (/[_\d]/g.test(a) && i < val.length) {
						return val.charAt(i++);
					} else if (i >= val.length) {
						return "";
					} else {
						return a;
					}
				});

			if (event.type === "blur") {
				if (this.value.length <= 3) {
					this.value = "";
				}
			} else {
				cursorPosition(this.value.length, this);
			}
		}
			let inputs = document.querySelectorAll("[name='phone']");

			inputs.forEach(item => {
				item.addEventListener("input", createMask);
				item.addEventListener("focus", createMask);
				item.addEventListener("blur", createMask);
			});
		
	}

	init() {
		this.initMask();
		this.checkEmailInputs("[name='email']");

		this.forms.forEach(form => {
			form.addEventListener("submit", (e) => {
				e.preventDefault();

				let statusMessage = document.createElement("div");
				statusMessage.style.cssText = `color: grey;
				font-weight: 900;
				text-decoration: underline;
				`;
				form.parentNode.append(statusMessage);

				let formData = new FormData(form);
				statusMessage.textContent = this.message.loading;

				this.postData(this.url, formData)
					.then(res => {
						console.log(res);
						statusMessage.textContent = this.message.ok;
					})
					.catch(err => {
						console.log(`Произошла ошибка: ${err.message}`)
						statusMessage.textContent = this.message.error;
					})
					.finally( () => {
						this.clearInputs();
						setTimeout(() =>{
							statusMessage.remove();
						}, 6000);
					});
			});
		});
	}
}