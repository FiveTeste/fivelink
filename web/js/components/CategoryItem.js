class CategoryItem extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('category-item');
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  onClick() {
    const detail = { value: this.category };
    this.dispatchEvent(new CustomEvent("kyosk-click", { detail }));
  }

  connectedCallback() {
    const element = this.shadowRoot.querySelector(".item__image");
    element.style.setProperty("background-image", `url(${this.image})`);

    this.addEventListener("click", this.onClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }
}

export const { name, component } = registerComponent({
  name: "category-item",
  component: CategoryItem,
})