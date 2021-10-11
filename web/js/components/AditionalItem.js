class AditionalItem extends HTMLElement {
  constructor(){
    super();

    this.quantity = 0;

    const template = document.getElementById("aditional-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  updateQuantity() {
    const quantityContainer = this.shadowRoot.querySelector(".item__quantity span.quantity");
    quantityContainer.textContent = this.quantity;

    const detail = { product: this.product, quantity: this.quantity };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  handleIncrement() {
    this.quantity = this.quantity + 1;
    this.updateQuantity();
  }

  handleDecrement() {
    const newQuantity = this.quantity - 1;
    if (newQuantity < 0) return;

    this.quantity = this.quantity - 1;
    this.updateQuantity();
  }

  connectedCallback() {
    this.style.setProperty("-webkit-tap-highlight-color", "transparent");

    const quantityContainer = this.shadowRoot.querySelector(".item__quantity span.quantity");
    const buttonPlus = this.shadowRoot.querySelector(".item__quantity button.button__plus");
    const buttonMinus = this.shadowRoot.querySelector(".item__quantity button.button__minus");

    quantityContainer.textContent = this.quantity;
    buttonPlus.addEventListener("click", this.handleIncrement.bind(this));
    buttonMinus.addEventListener("click", this.handleDecrement.bind(this));
  }

  disconnectedCallback() {
    const buttonPlus = this.shadowRoot.querySelector(".item__quantity button.button__plus");
    const buttonMinus = this.shadowRoot.querySelector(".item__quantity button.button__minus");

    buttonPlus.removeEventListener("click", this.handleIncrement.bind(this));
    buttonMinus.removeEventListener("click", this.handleDecrement.bind(this));
  }
}

export const { name,component } = registerComponent({
  name: "aditional-item",
  component: AditionalItem
})