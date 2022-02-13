import { name as ProductsTemplate } from "../templates/Products.js";
import { name as ProductItem } from "../components/ProductItem.js";

import { formatMoney } from "../utils/numberFormat.js";
import { isPromotional } from "../utils/isPromotional.js";

import { api } from "../services/api.js";

class ProductsPage extends HTMLElement {
  constructor() {
    super();

    const pageTemplate = document.createElement(ProductsTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageTemplate);
  }

  handleClickItem(event) {
    const product = event.detail.value;

    const productCode = product.CODIGO;
    const groupCode = this.location.params.code;

    const url = `/${groupCode}/produtos/${productCode}${location.search}`;
    Router.go(url);
  }

  async loadItems() {
    const groupCode = this.location.params.code;
    const container = this.shadowRoot.firstChild;

    const data = await api(`produtobygrupo&codgrupo=${groupCode}`, {
      method: "GET"
    });

    data.forEach((item) => {
      const subGrupoName = item.PRODUTO || "";

      const isPromocao = isPromotional(item);
      const preco = isPromocao ? item.PRECO_PROMOCAO : item.PRECOVENDA;

      const imageUrl = item.FOTO ? item.FOTO : "../web/images/new/food.jpg";

      const element = document.createElement(ProductItem);
      element.addEventListener("kyosk-click", this.handleClickItem.bind(this));

      const slotsHtml = html`<span slot="name">${subGrupoName.toLowerCase()}</span>`;
      const slotsPreco = html`<span slot="preco">${formatMoney(preco || "")}</span>`;

      if (isPromocao) {
        const slotPrecoOriginal = html`<span slot="preco_original">${formatMoney(item.PRECOVENDA || "")}</span>`;
        element.appendChild(slotPrecoOriginal);
      }

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