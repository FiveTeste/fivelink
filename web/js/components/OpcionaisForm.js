import { name as OptionalItem } from "./OptionalItem.js";

import { orderStore } from "../store/order.js";

class OpcionaisForm extends HTMLElement {
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
            <strong class="title">Opcionais</strong>
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
    const product = event.detail.value;

    const exist = this.selectedProducts.findIndex((item) => 
      item.CODIGO === product.CODIGO
    );

    if (exist !== -1) {
      this.selectedProducts.splice(exist, 1);  
    } else {
      this.selectedProducts.push(product);
    }

    const detail = { value: this.selectedProducts };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  loadProducts(list = []) {
    const currentSlots = this.querySelectorAll('[slot="items"]');
    currentSlots.forEach(item => item.remove());

    const currentItems = orderStore.state[this.storeKey] || [];

    list.forEach((product) => {
      const name = product.PRODUTO || "";

      const element = document.createElement(OptionalItem);
      element.addEventListener("kyosk-change", this.handleSelect.bind(this));

      const slotsHtml = html`<span slot="name">${name.toLowerCase()}</span>`;

      const existent = currentItems.find(item => item.CODIGO === product.CODIGO);
      element.setAttribute("checked", !!existent);

      element.appendChild(slotsHtml);
      element.setAttribute("slot", "items");
      element.product = product;

      this.appendChild(element);
    });
  }

  connectedCallback() {
    if (this.titleText) {
      const titleElement = this.shadowRoot.querySelector("strong.title");
      titleElement.textContent = this.titleText;
    }

    fireEvent("toggle-form-slider", { enabled: true });
  }

  disconnectedCallback() {}
}

export const { name, component } = registerComponent({
  name: "opcionais-form",
  component: OpcionaisForm,
});