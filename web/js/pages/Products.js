import { name as ProductsTemplate } from "../templates/Products.js";

class ProductsPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    fireEvent("change-navbar", { show: false });

    this.innerHTML = "";

    const itemCode = this.location.params.code;
    const pageTemplate = document.createElement(ProductsTemplate);
    pageTemplate.code = itemCode;

    this.appendChild(pageTemplate);
  }
}

export const { name, component } = registerComponent({
  name: "products-page",
  component: ProductsPage
});