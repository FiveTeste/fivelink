import "../components/QuantitySelector.js";

class FormTalheres extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("form-talheres");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleChange(event) {
    const value = event.detail.value;

    const detail = { value };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  connectedCallback() {
    const selector = this.shadowRoot.querySelector("quantity-selector");
    selector.addEventListener("kyosk-change", this.handleChange.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "form-talheres",
  component: FormTalheres
});