import { sumTotalPrice, getShippingTax, getDiscountValue } from "../utils/calcs.js";
import { formatMoney } from "../utils/numberFormat.js";

class OrderSummary extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("order-summary");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  loadSummary(state) {
    const { items = [], cupom } = state;
    
    const totalPrice = sumTotalPrice(items);
    const shippingTax = getShippingTax(state);

    let totalFinal = parseFloat(totalPrice) + parseFloat(shippingTax);
    
    const discount = getDiscountValue(totalFinal, cupom);

    totalFinal = totalFinal - parseFloat(discount);
    totalFinal = totalFinal.toFixed(2);

    const totalValueContainer = this.shadowRoot.getElementById("total-value");
    const shippingTaxContainer = this.shadowRoot.getElementById("shipping-tax");
    const discountContainer = this.shadowRoot.getElementById("discount");
    const totalFinalContainer = this.shadowRoot.getElementById("total-final");

    totalValueContainer.textContent = formatMoney(totalPrice);
    shippingTaxContainer.textContent = formatMoney(shippingTax);
    discountContainer.textContent = formatMoney(discount);
    totalFinalContainer.textContent = formatMoney(totalFinal);
  }

  connectedCallback() {
    this.loadSummary(this.store.state);
    this.store.addListener(this.loadSummary.bind(this));
  }

  disconnectedCallback() {
    this.store.removeListener(this.loadSummary.bind(this));
  }
}


export const { name, component } = registerComponent({
  name: "order-summary",
  component: OrderSummary
});