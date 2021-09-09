class QuantitySelector extends HTMLElement {
  value = 0;

  constructor() {
    super();

    const style = html`
      <style>
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          -moz-appearance:textfield;
          margin: 0;
        }

        button {
          cursor: pointer;
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

    this.buttonMinus = document.createElement("button");
    this.buttonMinus.textContent = "-";

    this.input = document.createElement("input");
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

  dispatchChange() {
    const detail = { value: this.value, name: this.getAttribute("name") };
    const event = new CustomEvent("kyosk-change", { detail });
    this.dispatchEvent(event);
  }

  handleAdd() {
    const newValue = this.value + 1;
    this.input.value = newValue;
    this.value = newValue;
    this.dispatchChange();
  }

  handleMinus() {
    const newValue = this.value - 1;
    if (newValue < 0) return;

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

  connectedCallback() {
    this.buttonAdd.addEventListener("click", this.handleAdd.bind(this));
    this.buttonMinus.addEventListener("click", this.handleMinus.bind(this));
    this.input.addEventListener("change", this.handleDirectChange.bind(this));
  }

  disconnectedCallback() {
    this.buttonAdd.removeEventListener("click", this.handleAdd.bind(this));
    this.buttonMinus.removeEventListener("click", this.handleMinus.bind(this));
    this.input.removeEventListener("change", this.handleDirectChange.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "quantity-selector",
  component: QuantitySelector
})