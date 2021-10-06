import { clear } from "../store/actions.js";

import { api } from "../services/api.js";

import { isPromotional } from "../utils/isPromotional.js";
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

  async send(token) {
    const cartItems = this.store.state.items ? this.store.state.items : [];
    const currentDate = new Date();

    const mesa = {
      COD_MESA: window.nummesa,
      DATA: currentDate.toLocaleDateString(),
      HORA: currentDate.toLocaleTimeString(),
      EMPRESA: "000001",
      COD_FUNCIONARIO: "000001",
      NUM_MESA_ACOMODACAO: 0,
      ACRESCIMO: 0,
      SITUACAO: 0
    }

    const finalItems = cartItems.map((item) => {
      const subGrupo = item.subgroup ? item.subgroup.CODIGO : undefined;
      const codProduto = item.product ? item.product.CODIGO : undefined;

      const name = item.product ? item.product.PRODUTO : item.subgroup.SUBGRUPO;
      const itemDate = item.time;

      const itemsMontado = item.montagem ? item.montagem : [];
      const montado = itemsMontado.map((product) => {
        const itemPrice = isPromotional(product) ? product.PRECO_PROMOCAO : product.PRECOVENDA;

        return { 
          CODPRODUTO: product.CODIGO,
          PRECO: itemPrice
        }
      });

      return {
        ADC_CODITEM: "",
        ADICIONAL: "N",
        CANCELADO: 0,
        CODSUBGRUPO: subGrupo,
        COD_AGRUP: "",
        COD_MESA: window.nummesa,
        COD_PRODUTO: codProduto,
        COD_TEMP: "",
        COD_USUARIO: "000001",
        COMPLEMENTO: item.observation,
        COMPLEMENTO2: item.detail,
        DATA: itemDate.toLocaleDateString(),
        DISPOSITIVO: item.hash,
        FOTO: "default.png",
        HORA: itemDate.toLocaleTimeString(),
        IMPRESSO: 0,
        LISTA_ADICIONAIS: [],
        LISTA_OPCIONAIS: [],
        LISTA_MONTAGEM: montado,
        NAOSINCRONIZADO: 0,
        PAGO: "N",
        PRODUTO: name,
        QTDE: item.quantity,
        TOTAL: item.totalPrice,
        TRANSF_MESA: 0,
        UNITARIO: item.unitPrice,
      }
    });

    const requestData = {
      mesa,
      pedido: finalItems
    }

    const url = `salvarpedido&&token=${token}`;

    try {
      const response = await api(url, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.message && response.message === "sucesso") {
        fireEvent("show-modal", {
          type: "success", 
          message: "Seu pedido será entregue em instantes. Obrigado!",
          onConfirm: () => {
            this.store.dispatchAction(clear());

            const url = `/web/${location.search}`;
            Router.go(url);
          }
        });
      }
    } catch (err) {
      console.error(err);  

      const responseData = err.data;
      if (responseData) {
        if (responseData.message) {
          if (responseData.message === "invalid token") {
            fireEvent("show-modal", { 
              type: "error",
              message: "Token inválido.",
            });
          } else if (responseData.message === "order closed") {
            fireEvent("show-modal", { 
              type: "error",
              message: "Mesa fechada, você não pode realizar um novo pedido.",
            });
          }
        }
      } else {
        fireEvent("show-modal", { 
          type: "error", message: "Não conseguimos finalizar seu pedido."
        });
      }
    }
  }

  async sendCart() {
    fireEvent("show-modal", { 
      type: "warning",
      message: "Para fazer um pedido escaneie o QRCode presente em sua mesa.",
      onConfirm: () => {
        fireEvent("show-qr-reader", { onResult: this.send.bind(this) });
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