import { name as CategoriesTemplate } from "../templates/Categories.js";
import { name as CategoryItem } from "../components/CategoryItem.js";

import { api } from "../services/api.js";

class CategoriesPage extends HTMLElement {
  constructor() {
    super();

    const pageTemplate = document.createElement(CategoriesTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageTemplate);
  }

  handleClickItem(event) {
    const category = event.detail.value;

    const categoryCode = category.CODIGO;
    const groupCode = this.location.params.code;

    const url = `/web/${groupCode}/categorias/${categoryCode}${location.search}`;
    Router.go(url);
  }

  async loadItems() {
    const groupCode = this.location.params.code;
    const container = this.shadowRoot.firstChild;

    const data = await api(`subgrupo&codgrupo=${groupCode}`, {
      method: "GET"
    });

    data.forEach((item) => {
      const subGrupoName = item.SUBGRUPO || "";
      const imageUrl = item.FOTO ? item.FOTO : "/web/images/new/food.jpg";

      const element = document.createElement(CategoryItem);
      element.addEventListener("kyosk-click", this.handleClickItem.bind(this));

      const slotsHtml = html`<span slot="name">${subGrupoName.toLowerCase()}</span>`;

      element.appendChild(slotsHtml);
      element.image = imageUrl;
      element.slot = "items";
      element.category = item;

      container.appendChild(element);
    });
  }

  connectedCallback() {
    this.loadItems();
    fireEvent("change-navbar", { show: true });
  }
}

export const { name, component } = registerComponent({
  name: "categories-page",
  component: CategoriesPage
});