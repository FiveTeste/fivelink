import { sendCart } from "../utils/cartUtils.js";
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

  async sendCart() {
    fireEvent("show-modal", { 
      type: "warning",
      message: "Para fazer um pedido escaneie o QRCode presente em sua mesa.",
      onConfirm: () => {
        fireEvent("show-qr-reader", { onResult: sendCart });
      }
    });

    return;
  }


  connectedCallback() {
    const button = this.shadowRoot.getElementById("send_cart");
    button.addEventListener("click", this.sendCart.bind(this));

    this.toggleSendButton(this.store.state);
    this.store.addListener(this.toggleSendButton.bind(this));
  }
  disconnectedCallback() {
    const button = this.shadowRoot.getElementById("send_cart");
    button.removeEventListener("click", this.sendCart.bind(this));

    this.store.removeListener(this.toggleSendButton.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "cart-template",
  component: CartTemplate,
});