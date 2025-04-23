import { setTroco, setRecibo, setInfoRecibo } from "../store/actions.js";

import { sendCart } from "../utils/cartUtils.js";

class FinishTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("finish-page");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  toggleSendButton(state) {
    const button = this.shadowRoot.getElementById("send_cart");
    
    let shippingIsValid = state.retirarLocal;
    if (!shippingIsValid) {
      shippingIsValid = !!state.shipping && state.shipping !== "";
    }

    const orderIsValid = !!state.payment && shippingIsValid;
    if (orderIsValid) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  getInfoRecibo() {
    fireEvent("show-prompt", {
      text: "Informações para recibo.",
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: ({ value }) => {
        this.store.dispatchAction(setInfoRecibo(value));
        sendCart();
      },
      onCancel: () => {
        this.store.dispatchAction(setRecibo(false));
        this.store.dispatchAction(setInfoRecibo(undefined));
        this.store.dispatchAction(setTroco(undefined));
      }
    });
  }

  getRecibo() {
    fireEvent("show-modal", {
      message: "Deseja recibo?",
      textConfirm: "Sim",
      textCancel: "Não",
      onConfirm: () => {
        this.store.dispatchAction(setRecibo(true));
        this.getInfoRecibo(this);
      },
      onCancel: () => {
        this.store.dispatchAction(setRecibo(false));
        this.store.dispatchAction(setInfoRecibo(undefined));
        sendCart();
      }
    });
  }

  getValorTroco() {
    fireEvent("show-prompt", {
      text: "Informe o valor do troco.",
      inputType: "numeric",
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: ({ value }) => {
        const parsedValue = parseFloat(value);
        this.store.dispatchAction(setTroco(parsedValue));
        this.getRecibo(this);
      },
      onCancel: () => {
        this.store.dispatchAction(setTroco(undefined));
      }
    });
  }

  getDesejaTroco() {
    fireEvent("show-modal", {
      message: "Deseja troco?",
      onConfirm: this.getValorTroco.bind(this),
      textConfirm: "Sim",
      onCancel: () => {
        this.store.dispatchAction(setTroco(undefined));
        this.getRecibo(this);
      },
      textCancel: "Não"
    });
  }

  handleSend() {
    const isMoney = this.store.state.payment === "Dinheiro";
    if (isMoney) {
      this.getDesejaTroco();
    } else {
      this.getRecibo();
    }
  }

  connectedCallback() {
    if (this.store.state.items.length <= 0) {
      Router.go('/home');
    }
    
    this.toggleSendButton(this.store.state);

    const sendButton = this.shadowRoot.getElementById("send_cart");
    sendButton.addEventListener("click", this.handleSend.bind(this));

    this.store.addListener(this.toggleSendButton.bind(this));
  }
  disconnectedCallback() {
    const sendButton = this.shadowRoot.getElementById("send_cart");
    sendButton.removeEventListener("click", this.handleSend.bind(this));

    this.store.removeListener(this.toggleSendButton.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "finish-template",
  component: FinishTemplate,
});