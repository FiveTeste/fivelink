import { userStore } from "../store/user.js";
import { setShipping, setRetirarLocal } from "../store/actions.js";

class ShippingCard extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("shipping-card");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  loadAddress({ address }) {
    const addressContainer = this.shadowRoot.getElementById("address");

    if (address) {
      const addressText = `${address.endereco}, ${address.numero}, ${address.bairro.nome}`;
      
      addressContainer.textContent = addressText;
    } else {
      addressContainer.textContent = "";
    }
  }


  handleCheck(event) {
    const selectedValue = event.target.value;
    if (selectedValue == "0") {
      this.store.dispatchAction(setRetirarLocal());
    } else {
      const userAddress = userStore.state.address;
      this.store.dispatchAction(setShipping(userAddress));
    }
  }

  connectedCallback() {
    this.loadAddress(userStore.state);
    
    const shippingRadios = this.shadowRoot.querySelectorAll(`input[type="radio"][name="shipping"]`);
    shippingRadios.forEach((radio) => {
      radio.addEventListener("change", this.handleCheck.bind(this));
    });

    userStore.addListener(this.loadAddress.bind(this));
  }

  disconnectedCallback() {
  }
}


export const { name, component } = registerComponent({
  name: "shipping-card",
  component: ShippingCard
});