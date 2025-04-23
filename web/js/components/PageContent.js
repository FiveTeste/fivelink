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
    
    const header = pgContainer.querySelector(".page__header");
    const headerIsPresent = header.style.getPropertyValue('display') !== 'none';
    if (headerIsPresent) {
      pgContainer.style.setProperty("grid-template-rows", "5.4rem 1fr");
    } else {
      pgContainer.style.setProperty("grid-template-rows", "1fr");
    }
  }

  showFooter() {
    const pgContainer = this.shadowRoot.querySelector(".page");
    const footer = pgContainer.querySelector(".page__footer");
    footer.style.removeProperty("display");

    const header = pgContainer.querySelector(".page__header");
    const headerIsPresent = header.style.getPropertyValue('display') !== 'none';
    if (headerIsPresent) {
      pgContainer.style.removeProperty("grid-template-rows");
    } else {
      pgContainer.style.setProperty("grid-template-rows", "1fr 6rem");
    }
  }

  removeHeader() {
    const pgContainer = this.shadowRoot.querySelector(".page");
    const header = pgContainer.querySelector(".page__header");
    header.style.setProperty("display", "none");

    const footer = pgContainer.querySelector(".page__footer");
    const footerIsPresent = footer.style.getPropertyValue('display') !== 'none';
    if (footerIsPresent) {
      pgContainer.style.setProperty("grid-template-rows", "1fr 6rem");
    } else {
      pgContainer.style.setProperty("grid-template-rows", "1fr");
    }
  }

  showHeader() {
    const pgContainer = this.shadowRoot.querySelector(".page");
    const header = pgContainer.querySelector(".page__header");
    header.style.removeProperty("display");

    const nomeempresa = pgContainer.querySelector(".page__header span.header__nomeempresa");
    nomeempresa.textContent = window.empresa.FANTASIA;

    const footer = pgContainer.querySelector(".page__footer");
    const footerIsPresent = footer.style.getPropertyValue('display') !== 'none';
    if (footerIsPresent) {
      pgContainer.style.removeProperty("grid-template-rows");
    } else {
      pgContainer.style.setProperty("grid-template-rows", "5.4rem 1fr");
    }
  }

  changeNavBar(event) {
    const show = event.detail.show;
    if (show) {
      this.showFooter();
    } else {
      this.removeFooter();
    }
  }

  changeHeader(event) {
    const show = event.detail.show;
    if (show) {
      this.showHeader();
    } else {
      this.removeHeader();
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

  showQuantityPrompt(event) {
    const modalContainer = this.shadowRoot.querySelector(".modal");
    const container = document.createElement('div');

    const { 
      message,
      confirmText,
      cancelText,
      onConfirm, 
      onCancel
    } = event.detail;

    const htmlStr = html`
      <div class="content">
        <div class="content__message">
          <p>${message}</p>
        </div>
        <quantity-selector minvalue="1"></quantity-selector>
      </div>
    `;

    let quantity = 1;
    const quantitySelector = htmlStr.querySelector("quantity-selector");
    quantitySelector.addEventListener("kyosk-change", (e) => {
      quantity = e.detail.value ? e.detail.value : 1;
    });

    const buttonConfirm = document.createElement('button');
    buttonConfirm.textContent = confirmText;
    buttonConfirm.classList.add("button__close");
    buttonConfirm.addEventListener("click", () => {
      this.closeModal(container);
      if (onConfirm) onConfirm(quantity || 1);
    });

    const buttonCancel = document.createElement('button');
    buttonCancel.textContent = cancelText;
    buttonCancel.classList.add("button__close");
    buttonCancel.addEventListener("click", (...args) => {
      this.closeModal(container);
      if (onCancel) onCancel.apply(this, args);
    });

    container.classList.add("modal__container");
    container.appendChild(htmlStr);
    container.appendChild(buttonConfirm);
    container.appendChild(buttonCancel);

    modalContainer.appendChild(container);
    modalContainer.style.removeProperty("opacity");
    modalContainer.style.removeProperty("visibility");
  }

  showConfirm(event) {
    const modalContainer = this.shadowRoot.querySelector(".modal");
    const container = document.createElement('div');

    const { 
      message,
      confirmText,
      cancelText,
      onConfirm, 
      onCancel 
    } = event.detail;

    const htmlStr = html`
      <div class="content">
        <div class="content__message">
          <p>${message}</p>
        </div>
      </div>
    `;

    const buttonConfirm = document.createElement('button');
    buttonConfirm.textContent = confirmText;
    buttonConfirm.classList.add("button__close");
    buttonConfirm.addEventListener("click", (...args) => {
      this.closeModal(container);
      if (onConfirm) onConfirm.apply(this, args);
    });

    const buttonCancel = document.createElement('button');
    buttonCancel.textContent = cancelText;
    buttonCancel.classList.add("button__close");
    buttonCancel.addEventListener("click", (...args) => {
      this.closeModal(container);
      if (onCancel) onCancel.apply(this, args);
    });

    container.classList.add("modal__container");
    container.appendChild(htmlStr);
    container.appendChild(buttonConfirm);
    container.appendChild(buttonCancel);

    modalContainer.appendChild(container);
    modalContainer.style.removeProperty("opacity");
    modalContainer.style.removeProperty("visibility");
  }

  showModal(event) {
    const modalContainer = this.shadowRoot.querySelector(".modal");
    const container = document.createElement('div');

    const { type, message, onConfirm, onCancel, textConfirm, textCancel } = event.detail;

    const okText = textConfirm ? textConfirm : "OK";
    const cancelText = textCancel ? textCancel : "Cancelar";

    const icons = {
      success: '<svg-icon src="check-small.svg" style="color: var(--color-primary-text)" />',
      warning: '<svg-icon src="warning.svg" style="color: var(--color-primary-text)" />',
      error: '<svg-icon src="error.svg" style="color: var(--color-highlight)" />',
    }

    const htmlStr = html`
      <div class="content">
        ${type ? `<div class="content__icon">${icons[type]}</div>` : ''}
        <div class="content__message">
          <p>${message}</p>
        </div>
      </div>
    `;

    const button = document.createElement('button');
    button.textContent = okText;
    button.classList.add("button__close");
    button.addEventListener("click", (...args) => {
      this.closeModal(container);
      if (onConfirm) onConfirm.apply(this, args);
    });

    container.classList.add("modal__container");
    container.appendChild(htmlStr);
    container.appendChild(button);

    if (onCancel) {
      const cancelButton = document.createElement('button');
      cancelButton.textContent = cancelText;
      cancelButton.classList.add("button__close");
      cancelButton.addEventListener("click", (...args) => {
        this.closeModal(container);
        onCancel.apply(this, args);
      });

      container.appendChild(cancelButton);
    }

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
      if (link.getAttribute("data-href") === currentPage) {
        icon.style.setProperty("color", "var(--color-highlight)");
      } else {
        icon.style.setProperty("color", "var(--color-primary-text)");
      }
    });
  }

  loadViewHeight() {
    const body = document.querySelector("body");

    const height = window.innerHeight;
    this.style.setProperty("--v-height", `${height}px`);
    body.style.setProperty("height", `${height}px`);
  }

  updatedCart(value) {
    const items = value.items || [];

    const cartValue = items.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
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
    window.addEventListener("kyosk-change-header", this.changeHeader.bind(this));
    window.addEventListener("kyosk-show-modal", this.showModal.bind(this));
    window.addEventListener("kyosk-show-confirm", this.showConfirm.bind(this));
    window.addEventListener("kyosk-quantity-prompt", this.showQuantityPrompt.bind(this));
    window.addEventListener("resize", this.loadViewHeight.bind(this));
  }

  disconnectedCallback() {
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link) => link.removeEventListener("click", this.goTo));

    this.store.removeListener(this.updatedCart.bind(this));

    window.removeEventListener("vaadin-router-location-changed", this.loadLinks.bind(this));
    window.removeEventListener("kyosk-change-navbar", this.changeNavBar.bind(this));
    window.removeEventListener("kyosk-change-header", this.changeHeader.bind(this));
    window.removeEventListener("kyosk-show-modal", this.showModal.bind(this));
    window.removeEventListener("kyosk-show-confirm", this.showConfirm.bind(this));
    window.removeEventListener("kyosk-quantity-prompt", this.showQuantityPrompt.bind(this));
    window.removeEventListener("resize", this.loadViewHeight.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "page-content",
  component: PageContent,
});