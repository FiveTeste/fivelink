class CategoryItem extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('category-item');
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  onClick() {
    const categoryCode = this.category.CODIGO;
    const groupCode = router.location.params.code;

    const url = `/web/${groupCode}/categorias/${categoryCode}${location.search}`;
    Router.go(url);
  }

  connectedCallback() {
    const element = this.shadowRoot.querySelector(".item__image");
    element.src = this.image;

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