import { name as ProductsTemplate } from "../templates/Products.js";
import { name as ProductItem } from "../components/ProductItem.js";

import { api } from "../services/api.js";

class ProductsPage extends HTMLElement {
  constructor() {
    super();
  }

  async loadItems() {
    const data = await api(`produtobygrupo&codgrupo=${this.location.params.code}`, {
      method: "GET"
    });

    const container = this.firstChild;
    console.log(container);

    data.forEach((item) => {
      const subGrupoName = item.PRODUTO || "";
      const preco = item.PRECOVENDA || "";
      const imageUrl = "/web/images/new/food.jpg";

      const element = document.createElement(ProductItem);

      const slotsHtml = html`<span slot="name">${subGrupoName.toLowerCase()}</span>`;
      const slotsPreco = html`<span slot="preco">${preco}</span>`;

      element.appendChild(slotsHtml);
      element.appendChild(slotsPreco);
      element.image = imageUrl;
      element.code = item.CODIGO;
      element.slot = "items";

      container.appendChild(element);
    });
  }

  connectedCallback() {
    fireEvent("change-navbar", { show: false });

    this.loadItems();
    this.innerHTML = "";

    const itemCode = this.location.params.code;
    const pageTemplate = document.createElement(ProductsTemplate);
    pageTemplate.code = itemCode;

    this.appendChild(pageTemplate);
  }
}

export const { name, component } = registerComponent({
  name: "products-page",
  component: ProductsPage
});