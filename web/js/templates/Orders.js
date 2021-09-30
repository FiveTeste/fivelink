import { api } from "../services/api.js";

class OrdersTemplate extends HTMLElement {
  static get observedAttributes() {
    return ['show'];
  }

  constructor() {
    super();

    const template = document.getElementById("orders-page");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  async sendCloseOrder() {
    const url = `fecharcomanda`;
    const token = this.token;

    const requestData = {
      token,
    }

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
          message: "Em breve um garçon virá até sua mesa. Obrigado!",
          onConfirm: () => this.handleReload(token)
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
          }
        }
      } else {
        fireEvent("show-modal", { 
          type: "error", message: "Não foi possível pedir sua conta."
        });
      }
    }
  }
 
  closeOrder() {
    fireEvent("show-modal", { 
      type: "warning",
      message: "Deseja pedir sua conta?",
      onConfirm: this.sendCloseOrder.bind(this)
    });
  }


  toggleSendButton(show) {
    const button = this.shadowRoot.getElementById("close_order");
    
    const showButton = eval(show);
    if (showButton) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "show") {
      this.toggleSendButton(newValue);
    }
  }

  connectedCallback() {
    const button = this.shadowRoot.getElementById("close_order");
    button.addEventListener("click", this.closeOrder.bind(this));
  }
  disconnectedCallback() {
    const button = this.shadowRoot.getElementById("close_order");
    button.removeEventListener("click", this.closeOrder.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "orders-template",
  component: OrdersTemplate,
});