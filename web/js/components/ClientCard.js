import { userStore } from "../store/user.js";

import { findClient } from "../utils/clientUtils.js";

class ClientCard extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("client-card");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  loadClient({ user, address }) {
    if (!user) return;

    const nameContainer = this.shadowRoot.getElementById("client_name");
    const phoneContainer = this.shadowRoot.getElementById("client_phone");

    const [nome] = user.nome.split(" ");

    nameContainer.textContent = nome;
    phoneContainer.textContent = user.telefone;

    if (address) {
      const addressContainer = this.shadowRoot.getElementById("client_address");

      const addressText = `${address.endereco}, ${address.numero}, ${address.bairro.nome}`;
      addressContainer.textContent = addressText;
    }
  }

  async changePhone() {
    fireEvent("show-prompt", {
      text: "Informe seu número de telefone.",
      inputMask: "phone",
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: findClient
    });
  }

  updateRegistration() {
    const url = `/atualizar-cadastro${location.search}`;
    Router.go(url);
  }

  connectedCallback() {
    this.loadClient(userStore.state);

    const buttonChangePhone = this.shadowRoot.getElementById("change_phone");
    buttonChangePhone.addEventListener("click", this.changePhone.bind(this));

    const buttonUpdate = this.shadowRoot.getElementById("update_registration");
    buttonUpdate.addEventListener("click", this.updateRegistration.bind(this));

    userStore.addListener(this.loadClient.bind(this));
  }

  disconnectedCallback() {
    const buttonChangePhone = this.shadowRoot.getElementById("change_phone");
    buttonChangePhone.removeEventListener("click", this.changePhone.bind(this));

    const buttonUpdate = this.shadowRoot.getElementById("update_registration");
    buttonUpdate.removeEventListener("click", this.updateRegistration.bind(this));

    userStore.removeListener(this.loadClient.bind(this));
  }
}


export const { name, component } = registerComponent({
  name: "client-card",
  component: ClientCard
});