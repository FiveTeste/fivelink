import { name as CartTemplate } from "../templates/Cart.js";
import { name as CartItem } from "../components/CartItem.js";

import { removeItem } from "../store/actions.js";

// import { api } from "../services/api.js";

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

    items.forEach(item => {
      const element = document.createElement(CartItem);

      const name = item.product.PRODUTO;
      const imageUrl = "/web/images/new/food.jpg";
      const slotsHtml = html`<span slot="name">${name.toLowerCase()}</span>`;

      element.image = imageUrl;
      element.appendChild(slotsHtml);
      element.slot = "items";

      container.appendChild(element);
    })

    console.log(this.store.state); 
  }

  handleUpdateCart(values) {
    console.log(values);
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