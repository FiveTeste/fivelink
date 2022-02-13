import { userStore } from "../store/user.js";

import { findClient } from "../utils/clientUtils.js";
class CartTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("cart-page");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  toggleSendButton(state) {
    const button = this.shadowRoot.getElementById("send_cart");
    
    const cartItems = state.items ? state.items : [];
    const hasItems = cartItems.length > 0;
    if (hasItems) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  async getClient(response) {
    const client = await findClient(response);
    if (client) {
      Router.go('/finish');
    }
  }

  changePhone() {
    if (userStore.state.user) {
      Router.go('/finish');
    } else {
      fireEvent("show-prompt", {
        text: "Informe seu número de telefone.",
        inputMask: "phone",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        onConfirm: this.getClient.bind(this)
      });
    }
  }

  connectedCallback() {
    const buttonInsertPhone = this.shadowRoot.getElementById("send_cart");
    buttonInsertPhone.addEventListener("click", this.changePhone.bind(this));
    
    this.toggleSendButton(this.store.state);
    this.store.addListener(this.toggleSendButton.bind(this));

    
  }
  disconnectedCallback() {
    const buttonInsertPhone = this.shadowRoot.getElementById("send_cart");
    buttonInsertPhone.removeEventListener("click", this.changePhone.bind(this));
    
    this.store.removeListener(this.toggleSendButton.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "cart-template",
  component: CartTemplate,
});