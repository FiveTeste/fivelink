import { name as FinishTemplate } from "../templates/Finish.js";

class FinishPage extends HTMLElement {
  constructor() {
    super();

    const pageTemplate = document.createElement(FinishTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageTemplate);
  }

  connectedCallback() {
    fireEvent("change-navbar", { show: true });
    fireEvent("change-header", { show: true });
  }
  disconnectedCallback() {}
}

export const { name, component } = registerComponent({
  name: "finish-page",
  component: FinishPage
});