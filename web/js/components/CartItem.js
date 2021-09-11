class CartItem extends HTMLElement {
  constructor(){
    super();

    const template = document.getElementById("cart-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleDelete() {}

  connectedCallback() {
    const element = this.shadowRoot.querySelector(".item__image");
    element.src = this.image;

    this.addEventListener("click", this.onclick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.onclick);
  }
}

export const { name,component } = registerComponent({
  name: "cart-item",
  component: CartItem
})