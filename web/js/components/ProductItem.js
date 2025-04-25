class ProductItem extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'image'];
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

  handleCheck(checked) {
    const container = this.shadowRoot.querySelector(".item");
    const isChecked = checked === "true";

     if (isChecked) {
       if (container.classList.contains("checked")) return;
       container.classList.add("checked");
     } else {
       container.classList.remove("checked");
     }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this.handleCheck(newValue);
    } else if (name === "image") {
      const element = this.shadowRoot.querySelector(".image-container__image");
      if (element) {
        element.style.setProperty("background-image", `url(${newValue})`);
      }
    }
  }

  connectedCallback() {
    const imageAttr = this.getAttribute("image");
    if (imageAttr) {
      const element = this.shadowRoot.querySelector(".image-container__image");
      element.style.setProperty("background-image", `url(${imageAttr})`);
    }

    this.handleCheck(this.getAttribute("checked"));
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