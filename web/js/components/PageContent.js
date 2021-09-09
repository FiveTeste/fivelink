import { formatMoney } from "../utils/numberFormat.js";
class PageContent extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("page-content");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  removeFooter() {
    const pgContainer = this.shadowRoot.querySelector(".page");
    const footer = pgContainer.querySelector(".page__footer");

    footer.style.setProperty("display", "none");
    pgContainer.style.setProperty("grid-template-rows", "5.4rem 1fr");
  }

  showFooter() {
    const pgContainer = this.shadowRoot.querySelector(".page");
    const footer = pgContainer.querySelector(".page__footer");

    footer.style.removeProperty("display");
    pgContainer.style.removeProperty("grid-template-rows");
  }

  changeNavBar(event) {
    const show = event.detail.show;
    if (show) {
      this.showFooter();
    } else {
      this.removeFooter();
    }
  }

  goTo(event) {
    event.preventDefault();
    const target = event.target.getAttribute("href");
    if (!target) return;

    const url = `${target}${location.search}`;
    Router.go(url);
  }

  loadLinks(event) {
    const currentPage = event.detail.location.pathname;

    const navContainer = this.shadowRoot.querySelector(".navbar");
    const navLinks = navContainer.querySelectorAll("a");
    navLinks.forEach((link) => {
      const icon = link.querySelector("object[data-type='svg-icon']");
      if (link.getAttribute("href") === currentPage) {
        icon.setAttribute("data-icon-stroke", "#BF4816");
      } else {
        icon.setAttribute("data-icon-stroke", "#333");
      }
    });
  }

  loadViewHeight() {
    const height = window.innerHeight;
    this.style.setProperty("--v-height", `${height}px`);
  }

  updatedCart(value) {
    const items = value.items || [];

    const cartValue = items.reduce((acc, item) => acc + item.totalPrice, 0);
    const container = this.shadowRoot.getElementById("cart_value");
    container.textContent = formatMoney(cartValue);
  }

  connectedCallback() {
    this.loadViewHeight();

    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link) => link.addEventListener("click", this.goTo));

    this.store.addListener(this.updatedCart.bind(this));
    
    window.addEventListener("vaadin-router-location-changed", this.loadLinks.bind(this));
    window.addEventListener("kyosk-change-navbar", this.changeNavBar.bind(this));
    window.addEventListener("resize", this.loadViewHeight.bind(this));
  }

  disconnectedCallback() {
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link) => link.removeEventListener("click", this.goTo));

    this.store.removeListener(this.updatedCart.bind(this));

    window.removeEventListener("vaadin-router-location-changed", this.loadLinks.bind(this));
    window.removeEventListener("kyosk-change-navbar", this.loadLinks.bind(this));
    window.removeEventListener("resize", this.loadViewHeight.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "page-content",
  component: PageContent,
});