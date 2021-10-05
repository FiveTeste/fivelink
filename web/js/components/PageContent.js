import { formatMoney } from "../utils/numberFormat.js";

import { api } from "../services/api.js";
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

  async generateToken() {
    const requestData = {
      mesa: window.nummesa
    };

    const response = await api("generatetoken", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const token = response.token;
    return token;
  }

  showQRReader(event) {
    const { onResult: onResultCallback } = event.detail;

    const container = document.createElement("div");
    container.classList.add("modal__container");

    const content = document.createElement("div");
    content.classList.add("content");

    const button = document.createElement("button");
    button.textContent = "Cancelar";
    button.classList.add("button__close");
    button.addEventListener("click", () => {
      this.closeModal(container);
    });

    const onResult = async (result) => {
      button.remove();

      const url = new URL(result);
      const mesa = url.searchParams.get("mesa");

      if (mesa == window.nummesa) {
        content.parentElement.style.removeProperty("width");
        content.style.cssText = `
          height: 15rem;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        content.innerHTML = `
          <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        `;

        await this.generateToken().then(onResultCallback)
          .catch(() => {
            fireEvent("show-modal", { 
              type: "error",
              message: "Não foi possível gerar um novo token.",
            });
          });

        this.closeModal(container);
      } else {
        this.closeModal(container);
      }
    }

    const video = document.createElement("qr-reader");
    video.onResult = onResult;
    content.appendChild(video);

    container.style.setProperty("width", "fit-content");
    container.appendChild(content);
    container.appendChild(button);

    const modal = this.shadowRoot.querySelector(".modal");
    modal.appendChild(container);
    modal.style.removeProperty("opacity");
    modal.style.removeProperty("visibility");
  }

  showModal(event) {
    const modalContainer = this.shadowRoot.querySelector(".modal");
    const container = document.createElement('div');

    const { type, message, onConfirm } = event.detail;

    const icons = {
      success: '<svg-icon src="/web/icons/check-small.svg" style="color: var(--color-primary-text)" />',
      warning: '<svg-icon src="/web/icons/warning.svg" style="color: var(--color-primary-text)" />',
      error: '<svg-icon src="/web/icons/error.svg" style="color: var(--color-highlight)" />',
    }

    const htmlStr = html`
      <div class="content">
        <div class="content__icon">${icons[type]}</div>
        <div class="content__message">
          <p>${message}</p>
        </div>
      </div>
    `;

    const button = document.createElement('button');
    button.textContent = "Ok";
    button.classList.add("button__close");
    button.addEventListener("click", (...args) => {
      this.closeModal(container);
      if (onConfirm) onConfirm.apply(this, args);
    });

    container.classList.add("modal__container");
    container.appendChild(htmlStr);
    container.appendChild(button);

    modalContainer.appendChild(container);
    modalContainer.style.removeProperty("opacity");
    modalContainer.style.removeProperty("visibility");
  }

  closeModal(modal) {
    modal.remove();
    
    const modalContainer = this.shadowRoot.querySelector(".modal");
    const childCount = modalContainer.childElementCount;

    if (childCount <= 0) {
      modalContainer.style.cssText = `
        opacity: 0;
        visibility: hidden;
      `;
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
      const icon = link.querySelector("svg-icon");
      if (link.getAttribute("href") === currentPage) {
        icon.style.setProperty("color", "var(--color-highlight)");
      } else {
        icon.style.setProperty("color", "var(--color-primary-text)");
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
    window.addEventListener("kyosk-show-modal", this.showModal.bind(this));
    window.addEventListener("kyosk-show-qr-reader", this.showQRReader.bind(this));
    window.addEventListener("resize", this.loadViewHeight.bind(this));
  }

  disconnectedCallback() {
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link) => link.removeEventListener("click", this.goTo));

    this.store.removeListener(this.updatedCart.bind(this));

    window.removeEventListener("vaadin-router-location-changed", this.loadLinks.bind(this));
    window.removeEventListener("kyosk-change-navbar", this.loadLinks.bind(this));
    window.removeEventListener("kyosk-show-modal", this.showModal.bind(this));
    window.removeEventListener("kyosk-show-qr-reader", this.showQRReader.bind(this));
    window.removeEventListener("resize", this.loadViewHeight.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "page-content",
  component: PageContent,
});