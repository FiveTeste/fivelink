import { addItem } from "../store/actions.js";

class CardItem extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("card-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  onClick() {
    const url = `/web/products/${this.code}${location.search}`;
    this.store.dispatchAction(addItem(this.code));

    Router.go(url);
  }

  connectedCallback() {
    const element = this.shadowRoot.querySelector(".card__image");
    element.src = this.image;

    this.addEventListener("click", this.onClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }
}

export const { name, component } = registerComponent({
  name: "card-item",
  component: CardItem,
});