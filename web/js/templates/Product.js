import { name as FormSlider } from "../components/FormSlider.js";

import { name as PontoCarne } from "../components/PontoCarne.js";
import { name as UsaCopos } from "../components/UsaCopos.js";
import { name as FormTalheres } from "../components/FormTalheres.js";
import { name as ObservationForm } from "../components/ObservationForm.js";
import { name as FormQuantity } from "../components/FormQuantity.js";

import { addItem } from "../store/actions.js";

import { formatMoney } from "../utils/numberFormat.js";

class ProductTemplate extends HTMLElement {
  constructor() {
    super();

    this.ponto_carne;
    this.copo;
    this.copo_gelo;
    this.copo_gelo_limao;
    this.talheres;
    this.observation = "";
    this.quantity = 0;


    const template = document.getElementById("product-page");
    const content = template.content.cloneNode(true);
    
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(content);
  }
  
  handleFinish() {
    const product = this.product;
    const totalPrice = product.PRECOVENDA * this.quantity;

    const carneStr = product.USA_PONTO_CARNE === 1 ? `${this.ponto_carne}`: '';
    const talheresStr = product.USA_TALHERES === 1 ? `Talheres/Pratos: ${this.talheres}` : '';

    const coposStr = (() => {
      return `
        ${this.copo > 0 ? `Copo: ${this.copo}, ` : ''}
        ${this.copo_gelo > 0 ? `Copo com gelo: ${this.copo_gelo}, ` : ''}
        ${this.copo_gelo_limao > 0 ? `Copo com gelo e limão: ${this.copo_gelo_limao}` : ''}
      `
    })();
    const detail = `${carneStr}\n${coposStr}\n${talheresStr}`;

    const finish = {
      product: this.product,
      quantity: this.quantity,
      unitPrice: this.product.PRECOVENDA,
      observation: this.observation,
      totalPrice,
      detail,
    }

    this.store.dispatchAction(addItem(finish));

    const url = `/web/carrinho${window.location.search}`;
    Router.go(url);
  }

  handlePontoCarne(event) {
    this.ponto_carne = event.detail.value;
  }

  handleCopos(event) {
    const { name, value } = event.detail;

    switch (name) {
      case 'copo': 
        this.copo = value;
        break;
      case 'copo_gelo': 
        this.copo_gelo = value;
        break;
      case 'copo_gelo_limao': 
        this.copo_gelo_limao = value;
        break;
      default:
    }
  }

  handleTalheres(event) {
    this.talheres = event.detail.value;
  }

  handleObservation(event) {
    const value = event.detail.value;
    this.observation = value || "";
  }

  handleQuantity(event) {
    const quantity = event.detail.value;

    const price = this.product.PRECOVENDA;
    const value = price * quantity;

    const element = this.querySelector("span[slot='price']");
    element.textContent = formatMoney(value);

    this.quantity = quantity;
  }

  getSliderForms() {
    const product = this.product;
    const forms = [];

    if (product.USA_PONTO_CARNE === 1) {
      const element = document.createElement(PontoCarne);
      element.addEventListener("kyosk-change", this.handlePontoCarne.bind(this));

      forms.push(element);
    }
    if (product.USA_COPOS === 1) {
      const element = document.createElement(UsaCopos);
      element.addEventListener("kyosk-change", this.handleCopos.bind(this));

      forms.push(element);
    }
    if (product.USA_TALHERES === 1) {
      const element = document.createElement(FormTalheres);
      element.addEventListener("kyosk-change", this.handleTalheres.bind(this));

      forms.push(element);
    }

    const observationForm = document.createElement(ObservationForm);
    observationForm.addEventListener("kyosk-change", this.handleObservation.bind(this));

    const quantityForm = document.createElement(FormQuantity);
    quantityForm.addEventListener("kyosk-change", this.handleQuantity.bind(this));

    return [...forms, observationForm, quantityForm];
  }

  connectedCallback() {
    const sliderContainer = this.shadowRoot.querySelector(".slider");
    const slider = document.createElement(FormSlider);
    slider.items = this.getSliderForms();
    
    sliderContainer.appendChild(slider);
    slider.addEventListener("finish", this.handleFinish.bind(this));
  }

  disconnectedCallback() {}
}

export const { name, component } = registerComponent({
  name: "product-template",
  component: ProductTemplate,
});
