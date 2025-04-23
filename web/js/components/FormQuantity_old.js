import "../components/QuantitySelector.js";

class FormQuantity extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("form-quantity");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleChange(event) {
    const value = event.detail.value;

    const detail = { value };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));

    if (value > 0) {
      fireEvent("toggle-form-slider", { enabled: true });
    }
  }

  connectedCallback() {
    this.handleChange = this.handleChange.bind(this);

    const selector = this.shadowRoot.querySelector("quantity-selector");
    selector.addEventListener("kyosk-change", this.handleChange);

    fireEvent("toggle-form-slider", { enabled: false });
  }

  disconnectedCallback() {
    const selector = this.shadowRoot.querySelector("quantity-selector");
    selector.removeEventListener("kyosk-change", this.handleChange);
  }
}

export const { name, component } = registerComponent({
  name: "form-quantity",
  component: FormQuantity
});