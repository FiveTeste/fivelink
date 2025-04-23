import { removeItem, incrementItem, decrementItem, countOrder, setQuantity } from "../store/actions.js";
class OptionalItem extends HTMLElement {
  static get observedAttributes() {
    return ['checked'];
  }

  constructor(){
    super();

    this.quantity = 0;
    this.checked = false;

    const template = document.getElementById("optional-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleCheck(value) {
    const isChecked = eval(value);
    const container = this.shadowRoot.querySelector(".item");
    if (isChecked) {
      container.classList.add("checked");
      this.quantity = 1;
    } else {
      container.classList.remove("checked");
      this.quantity = 0;
    }
  }

  handleClick() {
    //const detail = { product: this.product, quantity: this.quantity };
   // this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this.handleCheck(newValue);
    }
  }

/*************************************** */
  updateQuantity() {
    //const quantityContainer = this.shadowRoot.querySelector(".item__quantity label.quantity");
    //quantityContainer.textContent = this.quantity;

    const detail = { product: this.product, quantity: this.quantity };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  handleIncrement() {
    const quantityContainer = this.shadowRoot.querySelector(".item__quantity label.quantity");
    this.quantity = Number.parseFloat(quantityContainer.textContent);

    this.quantity = this.quantity + 1;
    this.updateQuantity();
  }

  handleDecrement() {
    const quantityContainer = this.shadowRoot.querySelector(".item__quantity label.quantity");
    this.quantity = Number.parseFloat(quantityContainer.textContent);

    const newQuantity = this.quantity - 1;
    if (newQuantity < 0) return;

    this.quantity = this.quantity - 1;
    this.updateQuantity();
  }
  /***************************************************** */

  connectedCallback() {
    this.handleClick = this.handleClick.bind(this);

    this.style.setProperty("-webkit-tap-highlight-color", "transparent");
    this.addEventListener("click", this.handleClick, true);

    const quantityContainer = this.shadowRoot.querySelector(".item__quantity label.quantity");
    const buttonPlus = this.shadowRoot.querySelector(".item__quantity button.button__add");
    const buttonMinus = this.shadowRoot.querySelector(".item__quantity button.button__remove");

    quantityContainer.textContent = this.quantity;
    buttonPlus.addEventListener("click", this.handleIncrement.bind(this));
    buttonMinus.addEventListener("click", this.handleDecrement.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick, true);

    const buttonPlus = this.shadowRoot.querySelector(".item__quantity button.button__add");
    const buttonMinus = this.shadowRoot.querySelector(".item__quantity button.button__remove");

    buttonPlus.removeEventListener("click", this.handleIncrement.bind(this));
    buttonMinus.removeEventListener("click", this.handleDecrement.bind(this));
  }
}

export const { name,component } = registerComponent({
  name: "optional-item",
  component: OptionalItem
})