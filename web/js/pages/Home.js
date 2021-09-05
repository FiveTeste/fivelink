import { name as HomeTemplate } from "../templates/Home.js";
import { name as CardItem } from "../components/CardItem.js";

import { api } from "../services/api.js";

class HomePage extends HTMLElement {
  constructor() {
    super();

    const pageTemplate = document.createElement(HomeTemplate);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageTemplate);
  }

  async loadItems() {
    const data = await api("grupo", {
      method: "GET"
    });

    const container = this.shadowRoot.firstChild;
    data.forEach((item) => {
      const groupName = item.GRUPO || "";
      const imageUrl = "/web/images/new/food.jpg";

      const element = document.createElement(CardItem);

      const slotsHtml = html`
        <span slot="name">${groupName.toLowerCase()}</span>
      `;

      element.appendChild(slotsHtml);
      element.image = imageUrl;
      element.code = item.CODIGO;
      element.slot = "items";

      container.appendChild(element);
    });
  }

  connectedCallback() {
    this.loadItems();
    fireEvent("change-navbar", { show: true });
  }
}

export const { name, component } = registerComponent({
  name: "home-page",
  component: HomePage
});