import { name as FormSlider } from "../components/FormSlider.js";

import { clearOrder } from "../store/actions.js";
import { orderStore } from "../store/order.js";

import { formatMoney } from "../utils/numberFormat.js";
import { 
  createOrderDetail, 
  getProductsConfig,
  createForms,
  getSliderForms,
  finishOrder,
} from "../utils/renderOrder.js";

import { calcProductsUnitPrice, calcAdditionalPrice, loadProductPrice } from "../utils/calcs.js";

class ProductTemplate extends HTMLElement {
  constructor() {
    super();

    this.unitPrice = 0;
    this.options = {};

    this.forms = createForms();

    const template = document.getElementById("product-page");
    const content = template.content.cloneNode(true);
    
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(content);
  }
  
  createSelectionStr(state) {
    const detail = createOrderDetail(state);

    const orderElement = this.shadowRoot.querySelector(".order");
    const detailElement = orderElement.querySelector(".order__detail");
    detailElement.innerHTML = detail.toLowerCase();

    if (detail !== "") {
      orderElement.style.setProperty("display", "block");
    } else {
      orderElement.style.setProperty("display", "none");
    }
  }

  handleFinish() {
    finishOrder({
      product: this.product,
      category: this.category,
      unitPrice: this.unitPrice
    });
  }

  calcPrice(state) {
    const { quantity = 1, additional = [] } = state;

    const price = this.unitPrice;
    const value = price * quantity;

    const additionalPrice = calcAdditionalPrice(additional);
    const finalPrice = parseFloat(value) + parseFloat(additionalPrice);
    const fixedPrice = finalPrice.toFixed(2);

    const existent = this.querySelector("span[slot='price']");
    if (existent) {
      existent.textContent = formatMoney(fixedPrice);
    } else {
      const element = document.createElement("span");
      element.slot = "price";
      element.textContent = formatMoney(fixedPrice);
      this.appendChild(element);
    }
  }

  onChangeProducts(state) {
    const { products = [], additional = [] } = state;
    const productsArr = this.category ? products : [this.product];

    const productList = [...productsArr, ...additional];
    this.options = getProductsConfig(productList, this.category);
    this.slider.items = [...getSliderForms(this.options, this.forms)];

    this.unitPrice = calcProductsUnitPrice(products);
    const existent = this.querySelector("span[slot='price']");
    if (existent) {
      existent.textContent = formatMoney(this.unitPrice);
    } else {
      const element = document.createElement("span");
      element.slot = "price";
      element.textContent = formatMoney(this.unitPrice);
      this.appendChild(element);
    }
  }

  loadProductOptions() {
    const options = {
      USA_PONTO_CARNE: this.product.USA_PONTO_CARNE,
      USA_COPOS: this.product.USA_COPOS,
      USA_TALHERES: this.product.USA_TALHERES,
      adicionais: this.product.adicionais
    };

    this.options = options;
  }

  loadUnitPrice() {
    this.unitPrice = loadProductPrice(this.product);

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
      slider.items = [...getSliderForms(this.options, this.forms)];

      const image = this.category.FOTO;
      if (image) {
        imageElement.style.setProperty("background-image", `url(${image})`);
      }
    } else {
      this.loadProductOptions();
      this.loadUnitPrice();
      slider.items = [...getSliderForms(this.product, this.forms)];

      const image = this.product.FOTO;
      if (image) {
        imageElement.style.setProperty("background-image", `url(${image})`);
      }
    }

    sliderContainer.appendChild(slider);
    slider.addEventListener("finish", this.handleFinish.bind(this));
    this.slider = slider;

    orderStore.addListener(this.createSelectionStr.bind(this));
    orderStore.addListener(this.onChangeProducts.bind(this));
    orderStore.addListener(this.calcPrice.bind(this));
  }

  disconnectedCallback() {
    this.slider.removeEventListener("finish", this.handleFinish.bind(this));

    orderStore.removeListener(this.createSelectionStr.bind(this));
    orderStore.removeListener(this.onChangeProducts.bind(this));
    orderStore.removeListener(this.calcPrice.bind(this));

    orderStore.dispatchAction(clearOrder());
  }
}

export const { name, component } = registerComponent({
  name: "product-template",
  component: ProductTemplate,
});