import { name as ProductTemplate } from "../templates/Product.js";

import { api } from "../services/api.js";

import { formatMoney } from "../utils/numberFormat.js";
import { isPromotional } from "../utils/isPromotional.js";

class ProductPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  async loadProduto() {
    const code = this.location.params.productCode;
    const product = await api(`produto&cod=${code}`, {
      method: "GET",
    });

    const nameElement = document.createElement("span");
    nameElement.slot = "name";
    nameElement.textContent = product.PRODUTO;

    const priceElement = document.createElement("span");
    priceElement.slot = "price";

    const price = isPromotional(product) ? product.PRECO_PROMOCAO : product.PRECOVENDA;
    priceElement.textContent = formatMoney(price);

    const pageTemplate = document.createElement(ProductTemplate);
    pageTemplate.product = product;
    pageTemplate.appendChild(nameElement);
    pageTemplate.appendChild(priceElement);

    if (product.ACOMPANHAMENTO) {
      const normalizedDescription = product.ACOMPANHAMENTO.replace(/\r?\n|\r/g, '<br />');

      const descriptionElement = document.createElement("span");
      descriptionElement.slot = "description";
      descriptionElement.innerHTML = normalizedDescription;

      pageTemplate.appendChild(descriptionElement);
    }

    this.shadowRoot.appendChild(pageTemplate);
  }

  async loadCategory() {
    const categoryCode = this.location.params.categoryCode;

    const subgrupoRequest = api(`getsubgrupo&cod=${categoryCode}`, {
      method: 'GET',
    });
    const productsRequest = api(`produtobysubgrupo&cod=${categoryCode}`, {
      method: "GET",
    });

    const [subgrupo, products] = await Promise.all([ 
      subgrupoRequest, 
      productsRequest 
    ]);

    const nameElement = document.createElement("span");
    nameElement.slot = "name";
    nameElement.textContent = subgrupo.SUBGRUPO;

    const pageTemplate = document.createElement(ProductTemplate);
    pageTemplate.category = subgrupo;
    pageTemplate.productList = products;
    pageTemplate.appendChild(nameElement);

    this.shadowRoot.appendChild(pageTemplate);
  }

  connectedCallback() {
    fireEvent("change-navbar", { show: false });

    const parent = this.location.route.parent.name;
    if (parent === "categories") {
      this.loadCategory();
    } else {
      this.loadProduto();
    }
  }

}

export const { name, component } = registerComponent({
  name: "product-page",
  component: ProductPage
});