import { name as RegisterTemplate } from "../templates/Register.js";

class RegisterPage extends HTMLElement {
  constructor() {
    super();

    this.currentItems = {};

    this.pageTemplate = document.createElement(RegisterTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.pageTemplate);
  }

  connectedCallback() {
    fireEvent("change-navbar", { show: false });
  }
  disconnectedCallback() {
    
  }
}

export const { name, component } = registerComponent({
  name: "register-page",
  component: RegisterPage
});