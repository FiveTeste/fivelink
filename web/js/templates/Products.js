class ProductsTemplate extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    const template = document.getElementById("products-page");
    const content = template.content.cloneNode(true);
  
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }
}

export const { name, component } = registerComponent({
  name: "products-template",
  component: ProductsTemplate,
});
