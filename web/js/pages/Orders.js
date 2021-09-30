import { name as OrdersTemplate } from "../templates/Orders.js";
import { name as OrderItem } from "../components/OrderItem.js";

import { api } from "../services/api.js";

import { formatMoney } from "../utils/numberFormat.js";

class OrdersPage extends HTMLElement {
  constructor() {
    super();

    this.currentItems = {};

    this.attachShadow({ mode: "open" });

  }

  async loadItems(token) {
    this.shadowRoot.innerHTML = "";

    const pageTemplate = document.createElement(OrdersTemplate);
    this.shadowRoot.appendChild(pageTemplate);

    const itemsUrl = `comanda&codmesa=${window.nummesa}`;
    const orderUrl = `infocomanda&codmesa=${window.nummesa}`;

    const itemsRequest = api(itemsUrl, {
      method: "GET"
    });
    const orderRequest = api(orderUrl, {
      method: "GET"
    });

    const [items, detail] = await Promise.all([itemsRequest, orderRequest]);

    let total = 0;
    items.forEach((item, index) => {
      const name = item.PRODUTO;
      const imageUrl = "/web/images/new/food.jpg";

      const observation = (() => {
        let finalStr = "";

        if (item.MONTADO && item.MONTADO.length > 0) {
          const str = item.MONTADO.reduce((acc, montagemItem, index) => {
            if (index > 0) return `${acc}, ${montagemItem.PRODUTO_NOME}`;

            return montagemItem.PRODUTO_NOME;
          }, "");

          finalStr = str;
        }

        if (item.COMPLEMENTO !== "") {
          finalStr = `${finalStr}<br />${item.COMPLEMENTO}`;
        }
        if (item.COMPLEMENTO2 !== "") {
          finalStr = `${finalStr}<br />${item.COMPLEMENTO2}`;
        }

        return finalStr;
      })();

      const element = document.createElement(OrderItem);

      const slotsHtml = html`
        <span slot="name">${name.toLowerCase()}</span>
        <span slot="observation">${observation.toLowerCase()}</span>
        <span slot="price">${formatMoney(item.TOTAL)}</span>
        <span slot="order-quantity">${item.QTDE}</span>
      `;

      element.appendChild(slotsHtml);
      element.setAttribute("image-url", imageUrl);
      element.item = item;
      element.index = index;
      element.slot = "items";


      total = total +  item.TOTAL;
      pageTemplate.appendChild(element);
    });

    const totalSlot = html`<span slot="total">${formatMoney(total)}</span>`;

    pageTemplate.appendChild(totalSlot);

    const isShow = items.length > 0 && detail.SITUACAO === 0;
    pageTemplate.setAttribute("show", isShow);
    pageTemplate.token = token;
    pageTemplate.handleReload = this.loadItems.bind(this);
  }

  connectedCallback() {
    fireEvent("show-modal", { 
      type: "warning",
      message: "Escaneie o QRCode presente em sua mesa para visualizar sua conta.",
      onConfirm: () => {
        fireEvent("show-qr-reader", { onResult: this.loadItems.bind(this) });
      }
    });

    fireEvent("change-navbar", { show: true });
  }
  disconnectedCallback() {
  }
}

export const { name, component } = registerComponent({
  name: "orders-page",
  component: OrdersPage
});