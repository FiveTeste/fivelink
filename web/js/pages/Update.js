import { name as RegisterTemplate } from "../templates/Register.js";

class UpdatePage extends HTMLElement {
  constructor() {
    super();

    this.currentItems = {};

    this.pageTemplate = document.createElement(RegisterTemplate);
    this.pageTemplate.action = "update";

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.pageTemplate);
  }

  connectedCallback() {
    fireEvent("change-navbar", { show: false });
    fireEvent("change-header", { show: true });
  }
  disconnectedCallback() {
    
  }
}

export const { name, component } = registerComponent({
  name: "update-page",
  component: UpdatePage
});