import Storage from "./Storage.js";
import { dragStart, drag, dragEnd, generateId } from "./Functions.js";

export default class Item {
	itemTitle;
	removeItemBtn;
	/**@type {HTMLElement} */
	itemElement;
	constructor(content, id) {
		this.itemTitleContent = content ?? "New card";
		this.id = id ?? generateId();
	}
	addItem() {
		const newItem = document.querySelector(".taskTemp").content.cloneNode(true);
		this.itemElement = newItem.querySelector(".task");
		this.itemElement.dataset.id = this.id;
		this.itemElement.addEventListener("dragstart", dragStart);
		this.itemElement.addEventListener("drag", drag);
		this.itemElement.addEventListener("dragend", dragEnd);

		this.itemTitle = newItem.querySelector(".task__content");
		this.itemTitle.textContent = this.itemTitleContent;
		this.itemTitle.addEventListener("blur", this.handleBlur.bind(this));
		this.itemTitle.addEventListener("click", (e) => {
			e.currentTarget.focus();
		});
		this.itemTitle.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				e.currentTarget.blur();
				window.getSelection().removeAllRanges();
			}
		});
		this.removeItemBtn = newItem.querySelector(".remove_task_btn");
		this.removeItemBtn.addEventListener("click", this.removeItem.bind(this));
		return newItem;
	}
	removeItem(e) {
		Storage.deleteItem(this.id);
		e.currentTarget.parentElement.remove();
	}
	handleBlur(e) {
		if (this.itemTitle.textContent !== this.itemTitleContent) {
			this.itemTitle.textContent = this.itemTitle.textContent.trim();
			this.itemTitleContent = this.itemTitle.textContent;

			Storage.updateItem(this.id, this.itemTitleContent);
		}
	}
}

{
	/* <template class="taskTemp">
	<div class="task">
		<h3 class="task__content"></h3>
		<button
			role="button"
			title="Remove this card"
			aria-label="Remove this card"
			class="remove_task_btn"
		>
			<svg
				width="14"
				height="18"
				viewBox="0 0 14 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path />
			</svg>
		</button>
	</div>
</template>; */
}
