import { name as OptionalItem } from "./OptionalItem.js";

import { formatMoney } from "../utils/numberFormat.js";

import { orderStore } from "../store/order.js";

class OpcionaisForm extends HTMLElement {
  constructor() {
    super();
    this.selectedProducts = [];
    this.max = 0;
    this.validateMax = true;

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
          padding-top: 0.5rem;
          padding-right: 0.5rem;
          padding-bottom: 8rem;
          padding-left: 0.5rem;
          /*max-height: 40rem;*/
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
            <span style="color: var(--color-gray-dark); font-size: 1.4rem; display: none;" id="quant_info">
              Escolha até <span id="quant_max">0</span> opções
            </span>
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

      var oldquantity = 0;
      if(exist !== -1)
        oldquantity = this.selectedProducts[exist].quantity;

    if(this.max > 0 && this.selectedProducts.length > 0){
        const qtde = this.selectedProducts.reduce((acc,item)=>{
          return acc + item.quantity;
        },0);

        if(qtde >= this.max && quantity > oldquantity){
          return;
        }
    }
    
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

    if(this.titleText === 'Adicione'){
      window.qtdeAdicionais = this.selectedProducts.length; 
    }
     
    
    const detail = { value: this.selectedProducts };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));    
  }

  setMax(max) {
    this.max = +max;
    this.validateMax = this.max > 0;
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

      if (this.showPrice) {
        const preco = product.isPromotional ? product.PRECO_PROMOCAO : product.PRECOVENDA;

        const priceSlots = html`
          <span slot="price">${formatMoney(preco)}</span>
          ${product.isPromotional ? `<span slot="original_price">${formatMoney(product.PRECOVENDA)}</span>` : ''}
        `;

        element.appendChild(priceSlots);
      }

      const existent = currentItems.find(item => item.product.CODIGO === product.CODIGO);
      //element.setAttribute("checked", !!existent);

      element.quantity = existent?.quantity || 0;
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

    const maxContainer = this.shadowRoot.querySelector("#quant_info");
    const maxElement = maxContainer.querySelector("#quant_max");
    if (this.validateMax) {
      maxContainer.style.setProperty("display", "block");
      maxElement.textContent = this.max;
    } else {
      maxContainer.style.setProperty("display", "none");
      maxElement.textContent = 0;
    }

    fireEvent("toggle-form-slider", { enabled: true });
    
  }

  disconnectedCallback() {}
}

export const { name, component } = registerComponent({
  name: "opcionais-form",
  component: OpcionaisForm,
});