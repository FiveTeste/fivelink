import { removeItem } from "../store/actions.js";
class CartItem extends HTMLElement {
  constructor(){
    super();

    const template = document.getElementById("cart-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleDelete() {
    const index = this.index;
    this.store.dispatchAction(removeItem({ index }));
  }

  connectedCallback() {
    const element = this.shadowRoot.querySelector(".item__image");
    element.src = this.image;

    const deleteButton = this.shadowRoot.querySelector("button.item__button-remove");
    deleteButton.addEventListener("click", this.handleDelete.bind(this));
  }
  disconnectedCallback() {
  }
}

export const { name,component } = registerComponent({
  name: "cart-item",
  component: CartItem
})