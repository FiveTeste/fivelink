import { name as FormSlider } from "../components/FormSlider.js";

import { name as PontoCarne } from "../components/PontoCarne.js";
import { name as UsaCopos } from "../components/UsaCopos.js";
import { name as FormTalheres } from "../components/FormTalheres.js";
import { name as ObservationForm } from "../components/ObservationForm.js";
import { name as FormQuantity } from "../components/FormQuantity.js";
import { name as ProductsForm } from "../components/ProductsForm.js";

import { addItem } from "../store/actions.js";

import { formatMoney } from "../utils/numberFormat.js";
import { isPromotional } from "../utils/isPromotional.js";

class ProductTemplate extends HTMLElement {
  constructor() {
    super();

    this.ponto_carne;
    this.copo;
    this.copo_gelo;
    this.copo_gelo_limao;
    this.talheres;
    this.observation = "";
    this.unitPrice = 0;
    this.quantity = 0;
    this.products = [];

    this.options = {};

    this.createForms();

    const template = document.getElementById("product-page");
    const content = template.content.cloneNode(true);
    
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(content);
  }
  
  createForms() {
    const productsForm = document.createElement(ProductsForm);
    productsForm.addEventListener("kyosk-change", this.handleProducts.bind(this));

    const pontoCarneForm = document.createElement(PontoCarne);
    pontoCarneForm.addEventListener("kyosk-change", this.handlePontoCarne.bind(this));

    const usaCoposForm = document.createElement(UsaCopos);
    usaCoposForm.addEventListener("kyosk-change", this.handleCopos.bind(this));

    const usaTalheresForm = document.createElement(FormTalheres);
    usaTalheresForm.addEventListener("kyosk-change", this.handleTalheres.bind(this));

    const observationForm = document.createElement(ObservationForm);
    observationForm.addEventListener("kyosk-change", this.handleObservation.bind(this));

    const quantityForm = document.createElement(FormQuantity);
    quantityForm.addEventListener("kyosk-change", this.handleQuantity.bind(this));

    const forms = new Map();
    forms.set("products", { index: 0, element: productsForm });
    forms.set("ponto-carne", { index: 1, element: pontoCarneForm });
    forms.set("usa-copos", { index: 2, element: usaCoposForm });
    forms.set("usa-talheres", { index: 3, element: usaTalheresForm });
    forms.set("observation", { index: 4, element: observationForm });
    forms.set("quantity", { index: 5, element: quantityForm });

    this.forms = forms;
  }

  createSelectionStr() {
    let finalStr = "";

    if (this.products && this.products.length > 0) {
      const str = this.products.reduce((acc, montagemItem, index) => {
        if (index > 0) return `${acc}, ${montagemItem.PRODUTO}`;

        return montagemItem.PRODUTO;
      }, "");

      finalStr = str;
    }

    const detail = this.createDetail();
    if (detail !== "") {
      finalStr = `${finalStr}<br />${detail}`;
    }

    const orderElement = this.shadowRoot.querySelector(".order");
    const detailElement = orderElement.querySelector(".order__detail");
    detailElement.innerHTML = finalStr.toLowerCase();

    if (finalStr !== "") {
      orderElement.style.setProperty("display", "block");
    } else {
      orderElement.style.setProperty("display", "none");
    }
  }

  createDetail() {
    const options = this.options;

    const carneStr = options.USA_PONTO_CARNE === 1 && this.ponto_carne ? `${this.ponto_carne}`: '';
    const talheresStr = options.USA_TALHERES === 1 && this.talheres ? `Talheres/Pratos: ${this.talheres}` : '';

    const coposStr = (() => {
      if (options.USA_COPOS !== 1) return "";

      let resultStr = "";
      if (this.copo > 0) {
        resultStr = `Copo: ${this.copo}`;
      }
      if (this.copo_gelo > 0) {
        resultStr = `${resultStr}, Copo com gelo: ${this.copo_gelo}`;
      }
      if (this.copo_gelo_limao > 0) {
        resultStr = `${resultStr}, Copo com gelo e limão: ${this.copo_gelo_limao}`;
      }

      return resultStr;
    })();

    let detail = "";
    if (carneStr !== "") {
      detail = carneStr;
    }
    if (coposStr !== "") {
      detail = `${detail}\n${coposStr}`;
    }
    if (talheresStr !== "") {
      detail = `${detail}\n${talheresStr}`;
    }

    return detail.replace(/\r?\n|\r/g, '. ');
  }
 
  handleFinish() {
    const product = this.product;
    const totalPrice = this.unitPrice * this.quantity;

    const currentDate = new Date();
    const str = `${currentDate.toLocaleString()}${totalPrice}${this.quantity}${window.nummesa}`;
    const hash = CryptoJS.MD5(str).toString().toUpperCase();

    const name = product ? product.PRODUTO : this.category.SUBGRUPO;
    const detail = this.createDetail();

    const uid = Date.now()
      .toString(36) + Math.random().toString(36).substring(2);

    const finish = {
      uid: uid.toUpperCase(),
      product: product,
      subgroup: this.category,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      observation: this.observation,
      time: currentDate,
      montagem: this.products,
      detail,
      name,
      totalPrice,
      hash,
    }

    this.store.dispatchAction(addItem(finish));

    fireEvent("show-confirm", {
      message: "Deseja continuar pedindo?",
      confirmText: "Pedir mais",
      cancelText: "Ir para o carrinho",
      onConfirm: () => {
        const url = `/web/${window.location.search}`;
        Router.go(url);
      }, 
      onCancel: () => {
        const url = `/web/carrinho${window.location.search}`;
        Router.go(url);
      }
    });

  }

  handlePontoCarne(event) {
    this.ponto_carne = event.detail.value;
    this.createSelectionStr();
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

    this.createSelectionStr();
  }

  handleTalheres(event) {
    this.talheres = event.detail.value;
    this.createSelectionStr();
  }

  handleObservation(event) {
    const value = event.detail.value;
    this.observation = value || "";
    this.createSelectionStr();
  }

  handleQuantity(event) {
    const quantity = event.detail.value;

    const price = this.unitPrice;
    const value = price * quantity;

    const existent = this.querySelector("span[slot='price']");
    if (existent) {
      existent.textContent = formatMoney(value);
    } else {
      const element = document.createElement("span");
      element.slot = "price";
      element.textContent = formatMoney(value);
      this.appendChild(element);
    }

    this.quantity = quantity;
  }

  handleProducts(event) {
    const selectedItems = event.detail.value;
    this.products = selectedItems;

    const defaultOptions = {
      PRODUTOS: 1,
      USA_PONTO_CARNE: 0,
      USA_COPOS: 0,
      USA_TALHERES: 0,
    };

    this.options = this.products.reduce((acc, item) => {
      const opts = {...acc};
      if (item.USA_PONTO_CARNE === 1) {
        opts.USA_PONTO_CARNE = 1;
      }
      if (item.USA_COPOS === 1) {
        opts.USA_COPOS = 1;
      }
      if (item.USA_TALHERES === 1) {
        opts.USA_TALHERES = 1;
      }

      return {...opts};
    }, defaultOptions);

    this.slider.items = [...this.getSliderForms()];

    const totalProductsPrice = this.products.reduce((acc, item) => {
      const itemPrice = isPromotional(item) ? item.PRECO_PROMOCAO : item.PRECOVENDA;
      return acc + itemPrice;
    }, 0);
    const unitPrice = totalProductsPrice / this.products.length;

    this.unitPrice = isNaN(unitPrice) ? 0 : unitPrice.toFixed(2);

    const existent = this.querySelector("span[slot='price']");
    if (existent) {
      existent.textContent = formatMoney(this.unitPrice);
    } else {
      const element = document.createElement("span");
      element.slot = "price";
      element.textContent = formatMoney(this.unitPrice);
      this.appendChild(element);
    }

    this.createSelectionStr();
  }

  getDefaulForms() {
    const observation = this.forms.get("observation");
    const quantity = this.forms.get("quantity");

    return [observation, quantity];
  }

  getSliderForms() {
    const forms = this.getDefaulForms();

    if (this.options.PRODUTOS === 1) {
      const form = this.forms.get("products");
      forms.push(form);
    }
    if (this.options.USA_PONTO_CARNE === 1) {
      const form = this.forms.get("ponto-carne");
      forms.push(form);
    }
    if (this.options.USA_COPOS === 1) {
      const form = this.forms.get("usa-copos");
      forms.push(form);
    }
    if (this.options.USA_TALHERES === 1) {
      const form = this.forms.get("usa-talheres");
      forms.push(form);
    }

    return forms.sort((a, b) => a.index - b.index).map(item => item.element);
  }

  loadProductOptions() {
    const options = {
      USA_PONTO_CARNE: this.product.USA_PONTO_CARNE,
      USA_COPOS: this.product.USA_COPOS,
      USA_TALHERES: this.product.USA_TALHERES
    };

    this.options = options;
  }

  loadUnitPrice() {
    if (isPromotional(this.product)) {
      this.unitPrice = this.product.PRECO_PROMOCAO;
    } else {
      this.unitPrice = this.product.PRECOVENDA;
    }

    const existent = this.querySelector("span[slot='price']");
    const element = existent ? existent : document.createElement("span");
    element.slot = "price";
    element.textContent = formatMoney(this.unitPrice);
    this.appendChild(element);
  }

  connectedCallback() {
    const imageElement = this.shadowRoot.querySelector(".product__image");

    const sliderContainer = this.shadowRoot.querySelector(".slider");
    const slider = document.createElement(FormSlider);
    
    const pathName = router.location.route.parent.name;
    if (pathName === "categories") {
      const { element: form } = this.forms.get("products");
      form.products = this.productList;
      form.max = this.category.QTDE_MAX_KYOSK;
      form.titleText = this.category.TITULO_SELETOR;

      this.options = { PRODUTOS: 1 }
      slider.items = [...this.getSliderForms()];

      const image = this.category.FOTO;
      if (image) {
        imageElement.style.setProperty("background-image", `url(${image})`);
      }
    } else {
      this.loadProductOptions();
      this.loadUnitPrice();

      slider.items = [...this.getSliderForms(this.product)];

      const image = this.product.FOTO;
      if (image) {
        imageElement.style.setProperty("background-image", `url(${image})`);
      }
    }

    sliderContainer.appendChild(slider);
    slider.addEventListener("finish", this.handleFinish.bind(this));

    this.slider = slider;
  }

  disconnectedCallback() {
    this.slider.removeEventListener("finish", this.handleFinish.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "product-template",
  component: ProductTemplate,
});
