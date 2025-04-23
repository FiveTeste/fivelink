import { isOpen } from "../utils/operation.js";

class WellcomeTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("wellcome-template");
    const content = template.content.cloneNode(true);
    
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(content);
  }

  connectedCallback() {
    const orderUnavailableButton = this.shadowRoot.querySelector('#operation-closed');
    const orderAvailableText = this.shadowRoot.querySelector('#order-available > span');

    if (isOpen()) {
      orderAvailableText.textContent = 'Faça seu pedido';
      orderUnavailableButton.style.setProperty('display', 'none');
    } else {
      orderAvailableText.textContent = 'Veja nosso cardápio';
      orderUnavailableButton.style.setProperty('display', 'flex');
    }
  }
}

export const { name, component } = registerComponent({
  name: "wellcome-template",
  component: WellcomeTemplate,
});