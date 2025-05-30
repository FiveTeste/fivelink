import { name as CartTemplate } from "../templates/Cart.js";
import { name as CartItem } from "../components/CartItem.js";

import { formatMoney } from "../utils/numberFormat.js";
import { createProductsDetail } from "../utils/renderOrder.js";

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
      const qtdestr = item.quantity > 1 ? `(${item.quantity}x) ` : '';
      
      const name = qtdestr + item.name;

      const isSubgrupo = !!item.subgroup;

      let imageUrl = "../web/images/new/food.jpg";
      if (isSubgrupo && item.subgroup.FOTO) {
        imageUrl = `${window.painelUrl}/${item.subgroup.FOTO}`;
      } else if (item.product && item.product.FOTO) {
        imageUrl = `${window.painelUrl}/${item.product.FOTO}`;
      }

      const observation = (() => {
        const productsDetail = createProductsDetail({ 
          products: item.montagem || [], 
          additional: item.additional || [],
          optional: item.optional || [],
          opcoes: item.opcoes || []
        });

        if (item.detail !== "") {
          return `${productsDetail}<br />${item.detail}`;
        }

        return productsDetail;
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

      const buttonAddcart = element.shadowRoot.querySelector('button[class="button__add"]');
      const buttonMinuscart = element.shadowRoot.querySelector('button[class="button__remove"]');
      if((item.montagem != null && item.montagem.length > 1) || (item.additional != null && item.additional.length > 0)){
        buttonAddcart.disabled = true;
        buttonMinuscart.disabled = true;
      }      

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
    fireEvent("change-header", { show: true });

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