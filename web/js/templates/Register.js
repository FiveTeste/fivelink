import { userStore } from "../store/user.js";
import { setUser, setAddress } from "../store/userActions.js";

import { api } from "../services/api.js";

import { masks } from "../utils/masks.js";
import { validatePhone } from "../utils/validatePhone.js";

class RegisterTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("register-page");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  async loadBairros() {
    const bairrosInput = this.shadowRoot.querySelector(`select[name="bairro_id"]`);
    if (!bairrosInput) return;

    fireEvent("show-loader");
    const bairros = await api(`bairros`);
    bairros.forEach(bairro => {
      const element = html`
        <option value="${bairro.id_bairro}">${bairro.nome}</option>
      `;
      bairrosInput.appendChild(element);
    });
    fireEvent("close-loader");
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData);

    const isValidPhone = validatePhone(values.telefone);
    if (!isValidPhone) {
      fireEvent("show-modal", {
        type: "error", 
        message: "Informe um número de telefone válido"
      });
      return;
    }


    if (typeof values.bairro_id === "string" && values.bairro_id !== "") {
      values.bairro_id = +values.bairro_id;
    }

    const url = this.action === "update" ? "updatecliente" : "savecliente";
    const requestData = {
      cliente_id: userStore.state.user.id,
      cliente: values
    }

    fireEvent("show-loader");
    try {
      const response = await api(url, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { bairro_id, bairro, endereco, numero, complemento, ...user } = response.cliente;
      const address = {
        bairro,
        bairro_id, 
        endereco, 
        numero, 
        complemento
      };

      userStore.dispatchAction(setUser(user));
      userStore.dispatchAction(setAddress(address));

      const msg = this.action === "update" ? "Atualização realizada com sucesso!" : "Cadastro realizado com sucesso!";
      fireEvent("show-modal", {
        type: "success", 
        message: msg,
        onConfirm: () => {
          const url = `/finish${location.search}`;
          Router.go(url);
        }
      });
    } catch (err) {
      if (err.data.message) {
        fireEvent("show-modal", {
          type: "error",
          message: err.data.message
        });
      } else {
        fireEvent("show-modal", {
          type: "error",
          message: "Não foi possivel finalizar o cadastro!"
        });
      }
    } finally {
      fireEvent("close-loader");
    }
  }

  handlePhoneInput(event) {
    let inputValue = event.target.value;
    inputValue = inputValue ? inputValue : "";

    const maskedValue = masks.phone(inputValue);
    event.target.value = maskedValue;
  }

  loadFormValues() {
    const { user, address } = userStore.state;

    const formObj = {
      nome: user.nome,
      telefone: user.telefone,
      bairro_id: address.bairro_id,
      endereco: address.endereco,
      numero: address.numero,
      complemento: address.complemento,
    };

    const form = this.shadowRoot.querySelector("form");
    const formInputs = form.elements;

    Object.entries(formObj).forEach(([key, value]) => {
      if (!value && value !== 0) return;

      const inputElement = formInputs.namedItem(key);
      inputElement.value = value;
    });

  }

  connectedCallback() {
    const pageTitle = this.action === "update" ? "Atualizar cadastro" : "Faça seu cadastro";
    const pageTitleElement = this.shadowRoot.getElementById("page_title");
    pageTitleElement.textContent = pageTitle;

    if (this.action === "update" && !userStore.state.user) {
      Router.go(`/home${location.search}`);
      return;
    }


    this.loadBairros().then(() => {
      if (this.action === "update") {
        this.loadFormValues();
      }
    });

    const phoneInput = this.shadowRoot.getElementById("phone");
    phoneInput.addEventListener("input", this.handlePhoneInput.bind(this));

    const form = this.shadowRoot.querySelector("form");
    form.addEventListener("submit", this.handleSubmit.bind(this));
    
    const userData = userStore.state.user ? userStore.state.user : {};
    const phone = userData.telefone ? userData.telefone : "";

    phoneInput.value = phone;
  }

  disconnectedCallback() {
    const phoneInput = this.shadowRoot.getElementById("phone");
    const form = this.shadowRoot.querySelector("form");

    phoneInput.removeEventListener("input", this.handlePhoneInput.bind(this));
    form.removeEventListener("submit", this.handleSubmit.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "register-template",
  component: RegisterTemplate,
});