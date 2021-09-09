class PontoCarne extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("ponto-carne");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleSelect() {
    const selectedItem = this.shadowRoot.querySelector("input[type='radio'][name='ponto']:checked");
    const detail = { value: selectedItem.value };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  connectedCallback() {
    const items = this.shadowRoot.querySelectorAll("input[type='radio'][name='ponto']");
    items.forEach((item) => item.addEventListener("click", this.handleSelect.bind(this)));
  }

  disconnectedCallback() {
    const items = this.shadowRoot.querySelectorAll("input[type='radio'][name='ponto']");
    items.forEach((item) => item.removeEventListener("click", this.handleSelect.bind(this)));
  }
}

export const { name, component } = registerComponent({
  name: "ponto-carne",
  component: PontoCarne
});