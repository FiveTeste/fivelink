class ProductItem extends HTMLElement {
  static get observedAttributes() {
    return ['checked'];
  }

  constructor() {
    super();

    const template = document.getElementById('product-item');
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  onClick() {
    const detail = { value: this.product, target: this };
    this.dispatchEvent(new CustomEvent("kyosk-click", { detail }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
     const container = this.shadowRoot.querySelector(".item");
     const isChecked = eval(newValue);

      if (isChecked) {
        if (container.classList.contains("checked")) return;
        container.classList.add("checked");
      } else {
        container.classList.remove("checked");
      }
    }
  }

  connectedCallback() {
    const element = this.shadowRoot.querySelector(".image-container__image ");
    element.src = this.image;

    this.addEventListener("click", this.onClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }
}

export const { name, component } = registerComponent({
  name: "product-item",
  component: ProductItem,
})