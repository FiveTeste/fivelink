import { name as ProductsTemplate } from "../templates/Products.js";
import { name as ProductItem } from "../components/ProductItem.js";

import { formatMoney } from "../utils/numberFormat.js";

import { api } from "../services/api.js";

class ProductsPage extends HTMLElement {
  constructor() {
    super();

    const pageTemplate = document.createElement(ProductsTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageTemplate);
  }

  async loadItems() {
    const groupCode = this.location.params.code;
    const container = this.shadowRoot.firstChild;

    const data = await api(`produtobygrupo&codgrupo=${groupCode}`, {
      method: "GET"
    });

    data.forEach((item) => {
      const subGrupoName = item.PRODUTO || "";
      const preco = item.PRECOVENDA || "";
      const imageUrl = "/web/images/new/food.jpg";

      const element = document.createElement(ProductItem);

      const slotsHtml = html`<span slot="name">${subGrupoName.toLowerCase()}</span>`;
      const slotsPreco = html`<span slot="preco">${formatMoney(preco)}</span>`;

      element.appendChild(slotsHtml);
      element.appendChild(slotsPreco);  
      element.image = imageUrl;
      element.slot = "items";
      element.product = item;

      container.appendChild(element);
    });
  }

  connectedCallback() {
    this.loadItems();
    fireEvent("change-navbar", { show: true });
  }
}

export const { name, component } = registerComponent({
  name: "products-page",
  component: ProductsPage
});