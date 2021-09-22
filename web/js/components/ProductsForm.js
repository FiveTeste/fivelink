import { name as ProductItem } from "./ProductItem.js";

import { formatMoney } from "../utils/numberFormat.js";
import { isPromotional } from "../utils/isPromotional.js";

class ProductsForm extends HTMLElement {
  constructor() {
    super();
    
    this.selectedProducts = [];

    const container = document.createElement("div");
    this.titleContainer = document.createElement("div");
    this.titleContainer.style.cssText = `
      margin-bottom: 1rem;
      padding: 0 0.5rem;
    `;
    
    const title = document.createElement("strong");
    title.textContent = "Produtos";
    title.style.cssText = `
      color: #333;
      font-weight: 600;
      display: block;
    `;

    this.titleContainer.appendChild(title);
    container.appendChild(this.titleContainer);

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
    const element = event.detail.target;

    const exist = this.selectedProducts.findIndex((item) => 
      item.CODIGO === selectedProduct.CODIGO
    );
    
    if (exist !== -1) {
      this.selectedProducts.splice(exist, 1);
      element.setAttribute("checked", false);
    } else {
      if (this.selectedProducts.length === this.max) return;

      this.selectedProducts.push(selectedProduct);
      element.setAttribute("checked", true);
    }

    const detail = { value: this.selectedProducts };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));

    const hasSelected = this.selectedProducts.length > 0;
    fireEvent("toggle-form-slider", { enabled: hasSelected });
  }

  connectedCallback() {
    if (this.max || this.max === 0) {
 
      const maxSpan = html`
        <span style="color: #3e3c3c; font-size: 1.4rem;">
          Máximo: ${this.max} produtos
        </span>
      `;
      this.titleContainer.appendChild(maxSpan);
    }

    const productList = this.products ? this.products : [];
    productList.forEach((product) => {
      const name = product.PRODUTO || "";

      const isPromocao = isPromotional(product);
      const preco = isPromocao ? product.PRECO_PROMOCAO : product.PRECOVENDA;
      const imageUrl = "/web/images/new/food.jpg";

      const element = document.createElement(ProductItem);
      element.addEventListener("kyosk-click", this.handleSelect.bind(this));

      const slotsHtml = html`<span slot="name">${name.toLowerCase()}</span>`;
      const slotsPreco = html`<span slot="preco">${formatMoney(preco || "")}</span>`;

      if (isPromocao) {
        const slotPrecoOriginal = html`<span slot="preco_original">${formatMoney(product.PRECOVENDA || "")}</span>`;
        element.appendChild(slotPrecoOriginal);
      }

      element.appendChild(slotsHtml);
      element.appendChild(slotsPreco);
      element.setAttribute("checked", false);
      element.image = imageUrl;
      element.product = product;

      this.listContainer.appendChild(element);
    });

    fireEvent("toggle-form-slider", { enabled: false });
  }

  discconnectCallback() {}
}

export const { name, component } = registerComponent({
  name: "products-form",
  component: ProductsForm,
});