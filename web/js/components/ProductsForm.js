import { name as ProductItem } from "./ProductItem.js";

import { formatMoney } from "../utils/numberFormat.js";

class ProductsForm extends HTMLElement {
  constructor() {
    super();
    
    this.selectedProducts = [];

    const container = document.createElement("div");
    
    const title = document.createElement("strong");
    title.textContent = "Produtos";
    title.style.cssText = `
      color: #333;
      font-weight: 600;
      padding: 0 0.5rem;
      margin-bottom: 1rem;
      display: inline-block;
    `;

    container.appendChild(title);

    this.listContainer = document.createElement("ul");
    this.listContainer.style.cssText = `
      padding: 0 0.5rem;
      max-height: 40rem;
      overflow-y: scroll;
      
      list-style-type: none;
      padding-inline-start: 0;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
    `;

    container.appendChild(this.listContainer);

    const shadow = this.attachShadow({ mode: "open"});
    shadow.appendChild(container);
  }

  handleSelect(event) {
    const selectedProduct = event.detail.value;

    const exist = this.selectedProducts.findIndex((item) => 
      item.CODIGO === selectedProduct.CODIGO
    );
    
    if (exist !== -1) {
      this.selectedProducts.splice(exist, 1);
    } else {
      this.selectedProducts.push(selectedProduct);
    }

    const detail = { value: this.selectedProducts };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  connectedCallback() {
    const productList = this.products ? this.products : [];
    productList.forEach((product) => {
      const name = product.PRODUTO || "";
      const preco = product.PRECOVENDA || "";
      const imageUrl = "/web/images/new/food.jpg";

      const element = document.createElement(ProductItem);
      element.addEventListener("kyosk-click", this.handleSelect.bind(this));

      const slotsHtml = html`<span slot="name">${name.toLowerCase()}</span>`;
      const slotsPreco = html`<span slot="preco">${formatMoney(preco)}</span>`;

      element.appendChild(slotsHtml);
      element.appendChild(slotsPreco);
      element.image = imageUrl;
      element.product = product;

      this.listContainer.appendChild(element);
    });
  }

  discconnectCallback() {}
}

export const { name, component } = registerComponent({
  name: "products-form",
  component: ProductsForm,
});