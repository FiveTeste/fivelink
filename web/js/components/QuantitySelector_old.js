class QuantitySelector extends HTMLElement {

  static get observedAttributes() {
    return ['minvalue'];
  }

  get minValue() {
    return this.getAttribute("minvalue");
  }

  constructor() {
    super();
    this.value = 0;

    const style = html`
      <style>
        .quantity-selector__input {
          border: none;
          border-width: 0;
          box-shadow: none;
          outline: none;
          font-family: var(--font-poppins);
        }

        .quantity-selector__input::-webkit-outer-spin-button,
        .quantity-selector__input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          -moz-appearance:textfield;
          margin: 0;
        }

        .quantity-selector__button {
          height: 4.2rem;
          width: 4.2rem;
          border: 0;
          outline: none;
          background: var(--color-quantity-button-background);
          color: var(--color-secondary-text);
          padding: 1rem;
          display: flex;
          border-radius: 50%;
          text-decoration: none;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-family: var(--font-poppins);
          font-size: 1.6rem;
          cursor: pointer;
        }
        
        .quantity-selector__button:hover{
          background: var(--color-quantity-button-hover-background);
          transition: all .3s ease;
        }
      </style>
    `

    const container = document.createElement("div");
    container.style.cssText = `
      display: grid;
      width: 100%;
      height: 4.2rem;
      grid-template-columns: 4.2rem minmax(0, 1fr) 4.2rem;
    `;

    this.buttonAdd = document.createElement("button");
    this.buttonAdd.textContent = "+";
    this.buttonAdd.classList.add("quantity-selector__button");

    this.buttonMinus = document.createElement("button");
    this.buttonMinus.textContent = "-";
    this.buttonMinus.classList.add("quantity-selector__button");

    this.input = document.createElement("input");
    this.input.classList.add("quantity-selector__input");
    this.input.type = "number";
    this.input.id = this.getAttribute("name");
    this.input.value = 0;
    this.input.style.textAlign = "center";

    container.appendChild(this.buttonMinus);
    container.appendChild(this.input);
    container.appendChild(this.buttonAdd);

    this.appendChild(style);
    this.appendChild(container);
  }

  setValue(value) {
    const numberValue = +value;

    this.input.value = numberValue;
    this.value = numberValue;
    this.dispatchChange();
  }

  dispatchChange() {
    const detail = { value: this.value, name: this.getAttribute("name") };
    const event = new CustomEvent("kyosk-change", { detail });
    this.dispatchEvent(event);
  }

  handleAdd(event) {
    event.stopPropagation();

    const newValue = this.value + 1;
    this.input.value = newValue;
    this.value = newValue;
    this.dispatchChange();
  }

  handleMinus(event) {
    event.stopPropagation();

    const newValue = this.value - 1;
    if (newValue < this.minValue) return;

    this.input.value = newValue;
    this.value = newValue;
    this.dispatchChange();
  }

  handleDirectChange(event) {
    event.stopPropagation();

    const value = this.input.value;
    this.value = +value;
    this.dispatchChange();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "minvalue") {
      const minValue = newValue ? +newValue : 0;
      if (this.value < minValue) {
        this.setValue(minValue);
      }
    }
  }

  connectedCallback() {
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handleDirectChange = this.handleDirectChange.bind(this);

    this.buttonAdd.addEventListener("click", this.handleAdd);
    this.buttonMinus.addEventListener("click", this.handleMinus);
    this.input.addEventListener("change", this.handleDirectChange);
  }

  disconnectedCallback() {
    this.buttonAdd.removeEventListener("click", this.handleAdd);
    this.buttonMinus.removeEventListener("click", this.handleMinus);
    this.input.removeEventListener("change", this.handleDirectChange);
  }
}

export const { name, component } = registerComponent({
  name: "quantity-selector",
  component: QuantitySelector
});