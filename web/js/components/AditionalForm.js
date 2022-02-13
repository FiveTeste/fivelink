import { name as AditionalItem } from "./AditionalItem.js";

import { formatMoney } from "../utils/numberFormat.js";
import { isPromotional } from "../utils/isPromotional.js";

import { orderStore } from "../store/order.js";

class AdicionalForm extends HTMLElement {
  constructor() {
    super();
    this.selectedProducts = [];

    const style = html`
      <style>
        .title__container {
          margin-bottom: 1rem;
          padding: 0 0.5rem;
        }
        .title__container .title {
          color: var(--color-primary-text);
          font-weight: 600;
          display: block;
        }
        .list__container {
          padding: 0.5rem;
          max-height: 40rem;
          overflow-y: scroll;
          
          list-style-type: none;
          margin-block-start: 0;
          margin-block-end: 0;
          margin-inline-start: 0;
          margin-inline-end: 0;
        }
      </style>
    `;
    
    const elementHtml = html`
        <div>
          <div class='title__container'>
            <strong class="title">Adicionais</strong>
          </div>
          <ul class="list__container">
            <slot name="items"></slot>
          </ul>
        </div>
    `;

    const shadow = this.attachShadow({ mode: "open"});
    shadow.appendChild(style);
    shadow.appendChild(elementHtml);
  }

  handleSelect(event) {
    const { product, quantity } = event.detail;

    const exist = this.selectedProducts.findIndex((item) => 
      item.product.CODIGO === product.CODIGO
    );

    if (exist !== -1) {
      if (quantity <= 0) {
        this.selectedProducts.splice(exist, 1);  
      } else {
        const currentItem = this.selectedProducts[exist];
        const newItem = { ...currentItem, quantity }
  
        this.selectedProducts.splice(exist, 1, newItem);
      }
    } else {
      const item = { product, quantity };
      this.selectedProducts.push(item);
    }

    const detail = { value: this.selectedProducts };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  loadProducts(list = []) {
    const currentSlots = this.querySelectorAll('[slot="items"]');
    currentSlots.forEach(item => item.remove());

    const { additional: currentItems = [] } = orderStore.state;

    list.forEach((product) => {
      const name = product.PRODUTO || "";

      const isPromocao = isPromotional(product);
      const preco = isPromocao ? product.PRECO_PROMOCAO : product.PRECOVENDA;
      const imageUrl = product.FOTO ? product.FOTO : "../web/images/new/food.jpg";

      const element = document.createElement(AditionalItem);
      element.addEventListener("kyosk-change", this.handleSelect.bind(this));

      const slotsHtml = html`<span slot="name">${name.toLowerCase()}</span>`;
      const slotsPreco = html`<span slot="price">${formatMoney(preco || "")}</span>`;

      if (isPromocao) {
        const slotPrecoOriginal = html`<span slot="preco_original">${formatMoney(product.PRECOVENDA || "")}</span>`;
        element.appendChild(slotPrecoOriginal);
      }

      const existent = currentItems.find(item => item.product.CODIGO === product.CODIGO);
      if (existent) {
        element.quantity = existent.quantity;
      }

      element.appendChild(slotsHtml);
      element.appendChild(slotsPreco);
      element.setAttribute("checked", false);
      element.setAttribute("slot", "items");
      element.image = imageUrl;
      element.product = product;

      this.appendChild(element);
    });
  }

  connectedCallback() {
    fireEvent("toggle-form-slider", { enabled: true });
  }

  discconnectCallback() {}
}

export const { name, component } = registerComponent({
  name: "aditional-form",
  component: AdicionalForm,
});