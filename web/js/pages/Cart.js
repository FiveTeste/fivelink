import { name as CartTemplate } from "../templates/Cart.js";
import { name as CartItem } from "../components/CartItem.js";

import { formatMoney } from "../utils/numberFormat.js";

class CartPage extends HTMLElement {
  constructor() {
    super();

    this.currentItems = {};

    const pageTemplate = document.createElement(CartTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageTemplate);
  }

  async loadItems(items = []) {
    const container = this.shadowRoot.firstChild;

    if (items.length === 0) {
      container.innerHTML = "";
      this.currentItems = [];
    }

    const currentItems = this.currentItems ? this.currentItems : {};
    Object.entries(currentItems).forEach(([key, element]) => {
      const existent = items.find((item) => item.uid === key);
      if (!existent) {
        element.remove();
      }
    });

    const newElements = items.reduce((acc, item, index) => {
      const name = item.name;

      const isSubgrupo = !!item.subgroup;

      let imageUrl = "/web/images/new/food.jpg";
      if (isSubgrupo && item.subgroup.FOTO) {
        imageUrl = item.subgroup.FOTO;
      } else if (item.product && item.product.FOTO) {
        imageUrl = item.product.FOTO;
      }

      const observation = (() => {
        let finalStr = "";

        if (item.montagem && item.montagem.length > 0) {
          const str = item.montagem.reduce((acc, montagemItem, index) => {
            if (index > 0) return `${acc}, ${montagemItem.PRODUTO}`;

            return montagemItem.PRODUTO;
          }, "");

          finalStr = str;
        }

        if (item.observation !== "") {
          finalStr = `${finalStr}<br />${item.observation}`;
        }
        if (item.detail !== "") {
          finalStr = `${finalStr}<br />${item.detail}`;
        }

        return finalStr;
      })();

      const existentElement = currentItems[item.uid];
      const element = existentElement ? existentElement : document.createElement(CartItem);
      
      const nameSlot = element.querySelector("span[slot='name']");
      const observationSlot = element.querySelector("span[slot='observation']");
      const priceSlot = element.querySelector("span[slot='price']");
      const quantitySlot = element.querySelector("span[slot='order-quantity']");

      if (nameSlot) nameSlot.remove();
      if (observationSlot) observationSlot.remove();
      if (priceSlot) priceSlot.remove();
      if (quantitySlot) quantitySlot.remove();

      const slotsHtml = html`
        <span slot="name">${name.toLowerCase()}</span>
        <span slot="observation">${observation.toLowerCase()}</span>
        <span slot="price">${formatMoney(item.totalPrice)}</span>
        <span slot="order-quantity">${item.quantity}</span>
      `;

      element.appendChild(slotsHtml);
      element.setAttribute("image-url", imageUrl);
      element.item = item;
      element.index = index;
      element.slot = "items";

      if (!existentElement) container.appendChild(element);
      
      return {...acc, [item.uid]: element}
    }, {});

    this.currentItems = newElements ? newElements : {};
  }

  handleUpdateCart(values) {
    this.loadItems(values.items);
  }

  connectedCallback() {
    this.loadItems(this.store.state.items);
    fireEvent("change-navbar", { show: true });

    this.store.addListener(this.handleUpdateCart.bind(this));
  }
  disconnectedCallback() {
    this.store.removeListener(this.handleUpdateCart.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "cart-page",
  component: CartPage
});