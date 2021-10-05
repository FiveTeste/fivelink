import { formatMoney } from "../utils/numberFormat.js";
import { isPromotional } from "../utils/isPromotional.js";

import { api } from "../services/api.js";
class HomeTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("home-page");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  async loadDestaques() {
    const data = await api("destaques", {
      method: "GET"
    });

    if (data.length > 0) {
      this.activeSlider(data);
    }
  }

  handleNavigate(product) {
    const { CODIGO, CODGRUPO } = product;

    const url = `/web/${CODGRUPO}/produtos/${CODIGO}${location.search}`;
    Router.go(url);
  }

  activeSlider(items) {
    const highlightsContainer = this.shadowRoot.querySelector(".highlights-container")
    const element = this.shadowRoot.getElementById("highlights-slider");
    const slidesContainer = element.querySelector(".highlights");

    items.forEach((item) => {
      const productName = item.PRODUTO || "";
      const isPromocao = isPromotional(item);
      const preco = isPromocao ? item.PRECO_PROMOCAO : item.PRECOVENDA;

      const imageUrl = "/web/images/new/food.jpg";
      const imageBackground = `linear-gradient(0deg, rgba(16, 17, 37, 0.5), rgba(16, 17, 37, 0.5)), url(${imageUrl});`

      const itemElement = html`
        <li class="glide__slide highlight__item" style="background-image: ${imageBackground}">
          <span class="item__name">${productName.toLowerCase()}</span>
          <div class="item__price price">
              ${isPromocao ? `<span class="price__old">${formatMoney(item.PRECOVENDA || "")}</span>` : ''}
              <span class="price__current">${formatMoney(preco || "")}</span>
          </div>
        </li>
      `;

      const listElement = itemElement.querySelector(".highlight__item");
      listElement.addEventListener("click", () => {
        this.handleNavigate(item);
      });

      slidesContainer.appendChild(itemElement);
    });
    highlightsContainer.style.display = "block";

    window.slider = new Glide(element, {
      type: "slider",
      autoplay: 15000
    }).mount();

  }

  connectedCallback() {
    this.loadDestaques();
    this.setAttribute("slot", "content");
  }
  disconnectedCallback() {

    if (this.slider) {
      this.slider.destroy();
    }
  }
}

export const { name, component } = registerComponent({
  name: "home-template",
  component: HomeTemplate,
});