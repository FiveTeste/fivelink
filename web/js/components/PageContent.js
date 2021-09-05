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

    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", this.goTo);
      
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

  connectedCallback() {
    this.loadViewHeight();

    window.addEventListener("vaadin-router-location-changed", this.loadLinks.bind(this));
    window.addEventListener("kyosk-change-navbar", this.changeNavBar.bind(this));
    window.addEventListener("resize", this.loadViewHeight.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("vaadin-router-location-changed", this.loadLinks.bind(this));
    window.removeEventListener("kyosk-change-navbar", this.loadLinks.bind(this));
    window.removeEventListener("resize", this.loadViewHeight.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "page-content",
  component: PageContent,
});