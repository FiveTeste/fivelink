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

  async loadItems() {
    const groupCode = this.location.params.code;
    const container = this.shadowRoot.firstChild;

    const data = await api(`subgrupo&codgrupo=${groupCode}`, {
      method: "GET"
    });

    data.forEach((item) => {
      const subGrupoName = item.SUBGRUPO || "";
      const imageUrl = "/web/images/new/food.jpg";

      const element = document.createElement(CategoryItem);

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