class CardItem extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("card-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  onClick() {
    const group = this.group;

    const url = group.TEM_SUBGRUPO 
      ? `/${group.CODIGO}/categorias${location.search}` 
      : `/${group.CODIGO}/produtos${location.search}`;

    Router.go(url);
    window.location.returnnavigation = url;
  }

  connectedCallback() {
    const element = this.shadowRoot.querySelector(".card__image");
    element.style.setProperty("background-image", `url(${this.image})`);

    this.addEventListener("click", this.onClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }
}

export const { name, component } = registerComponent({
  name: "card-item",
  component: CardItem,
});