import { name as WellcomeTemplate } from "../templates/Wellcome.js";

class WellcomePage extends HTMLElement {
  constructor() {
    super();

    const pageTemplate = document.createElement(WellcomeTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageTemplate);
  }

  connectedCallback() {
    fireEvent("change-navbar", { show: false });
    fireEvent("change-header", { show: false });
  }
}

export const { name, component } = registerComponent({
  name: "wellcome-page",
  component: WellcomePage
});