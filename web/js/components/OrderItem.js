import { removeItem, incrementItem, decrementItem } from "../store/actions.js";

class OrderItem extends HTMLElement {
  static get observedAttributes() {
    return ['image-url'];
  }

  constructor(){
    super();

    const template = document.getElementById("order-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleDelete() {
    const index = this.index;
    this.store.dispatchAction(removeItem({ index }));
  }

  handleIncrement() {
    const index = this.index;
    this.store.dispatchAction(incrementItem({ index }));
  }

  handleDecrement() {
    const index = this.index;
    this.store.dispatchAction(decrementItem({ index }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "image-url") {
      const imageElement = this.shadowRoot.querySelector(".item__image");
      imageElement.src = newValue;
    }
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }
}

export const { name,component } = registerComponent({
  name: "order-item",
  component: OrderItem
})