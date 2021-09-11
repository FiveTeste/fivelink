class CartTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("cart-page");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  connectedCallback() {}
}

export const { name, component } = registerComponent({
  name: "cart-template",
  component: CartTemplate,
});