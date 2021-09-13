import { name as CartTemplate } from "../templates/Cart.js";
import { name as CartItem } from "../components/CartItem.js";

import { removeItem } from "../store/actions.js";

import { formatMoney } from "../utils/numberFormat.js";

class CartPage extends HTMLElement {
  constructor() {
    super();

    const pageTemplate = document.createElement(CartTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageTemplate);
  }

  async loadItems(items = []) {
    const container = this.shadowRoot.firstChild;
    container.innerHTML = "";

    items.forEach((item, index) => {
      const element = document.createElement(CartItem);

      const name = item.name;
      const imageUrl = "/web/images/new/food.jpg";

      const slotsHtml = html`
        <span slot="name">${name.toLowerCase()}</span>
        <span slot="price">${formatMoney(item.totalPrice)}</span>
      `;

      element.image = imageUrl;
      element.item = item;
      element.index = index;
      element.slot = "items";
      element.appendChild(slotsHtml);

      container.appendChild(element);
    });
  }

  handleUpdateCart(values) {
    this.loadItems(values.items);
  }
  
  handleDeleteCart(){
    this.store.dispatchAction(removeItem({ index: 0 }));
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