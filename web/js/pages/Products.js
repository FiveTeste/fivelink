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
      const description = item.ACOMPANHAMENTO || "";  

      const preco = item.isPromotional ? item.PRECO_PROMOCAO : item.PRECOVENDA;

      const imageUrl = item.FOTO ? `${window.painelUrl}/${item.FOTO}` : "../web/images/new/food.jpg";

      const element = document.createElement(ProductItem);
      element.addEventListener("kyosk-click", this.handleClickItem.bind(this));

      const slotsHtml = html`<span slot="name">${subGrupoName.toLowerCase()}</span>`;
      const slotsPreco = html`<span slot="preco">${formatMoney(preco || "")}</span>`;

      const slotsDescription = html`<span slot="description">${description.toLowerCase()}</span>`;

      if (item.isPromotional) {
        const slotPrecoOriginal = html`<span slot="preco_original">${formatMoney(item.PRECOVENDA || "")}</span>`;
        element.appendChild(slotPrecoOriginal);
      }

      element.appendChild(slotsHtml);
      element.appendChild(slotsPreco);  
      element.appendChild(slotsDescription); 
      element.image = imageUrl;
      element.slot = "items";
      element.product = item;

      console.log("item", item);

      container.appendChild(element);
    });
  }

  connectedCallback() {
    this.loadItems();
    fireEvent("change-navbar", { show: true });
    fireEvent("change-header", { show: true });
  }
}

export const { name, component } = registerComponent({
  name: "products-page",
  component: ProductsPage
});