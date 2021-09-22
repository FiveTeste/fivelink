import "../components/QuantitySelector.js";

class UsaCopos extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("usa-copos");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleSelect(event) {
    const { value, name } = event.detail;
    const detail = { name, value };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  connectedCallback() {
    const items = this.shadowRoot.querySelectorAll("quantity-selector");
    items.forEach((item) => item.addEventListener("kyosk-change", this.handleSelect.bind(this)));

    fireEvent("toggle-form-slider", { enabled: true });
  }

  disconnectedCallback() {
    const items = this.shadowRoot.querySelectorAll("quantity-selector");
    items.forEach((item) => item.removeEventListener("kyosk-change", this.handleSelect.bind(this)));
  }
}

export const { name, component } = registerComponent({
  name: "usa-copos",
  component: UsaCopos
});