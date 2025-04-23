import { setTroco, setRecibo, setInfoRecibo } from "../store/actions.js";
import { appStore } from "../store/app.js";
import { sumTotalPrice } from "../utils/calcs.js";

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
        //this.getRecibo(this);
        sendCart();
      },
      onCancel: () => {
		  const sendButton = this.shadowRoot.getElementById("send_cart");
		  sendButton.removeAttribute('disabled');
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
        //this.getRecibo(this);
        sendCart();
      },
      textCancel: "Não"
    });
  }

  getAlertaValorMinimo() {
    var valormin = window.empresa.VALOR_MIN_ENTREGA;
    if(isNaN(valormin)) valormin = 0;
    fireEvent("show-modal", {
      message: "Valor mínimo do pedido para entrega é: R$ "+valormin.toFixed(2),
      textConfirm: "Ok"
    });
  }

  handleSend() {

    const valor_min_entrega = window.empresa.VALOR_MIN_ENTREGA;
    if(isNaN(valor_min_entrega)) valor_min_entrega = 0;

    const valorTotal = sumTotalPrice(this.store.state.items);
    if((!this.store.state.retirarLocal) && (parseFloat(valorTotal) < parseFloat(valor_min_entrega))){
      this.getAlertaValorMinimo();
      return;
    }

    const sendButton = this.shadowRoot.getElementById("send_cart");
    sendButton.setAttribute('disabled', '');

    const isMoney = this.store.state.payment === "Dinheiro";
    if (isMoney) {
      this.getDesejaTroco();
    } else {
      //this.getRecibo();
      sendCart();
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