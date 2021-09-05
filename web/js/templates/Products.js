class ProductsTemplate extends HTMLElement {
  constructor() {
    super();
  }

  onChange(value) {
    console.log("alterou", value);
  }

  connectedCallback() {
    const template = document.getElementById("products-page");
    const content = template.content.cloneNode(true);

    const item = content.querySelector("#item-id");
    item.textContent = this.code;

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);

    this.store.addListener(this.onChange);
  }
  disconnectedCallback() {
    this.store.removeListener(this.onChange);
  }
}

export const { name, component } = registerComponent({
  name: "products-template",
  component: ProductsTemplate,
});
