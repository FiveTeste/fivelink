class Loader extends HTMLElement {
  constructor() {
    super();

    this.style.cssText = `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 20;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-out;

      opacity: 0; 
      visibility: hidden;
    `;

    const template = document.getElementById("loader-template");
    const content = template.content.cloneNode(true);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(content);
  }

  showLoader() {
    this.style.setProperty("opacity", 1);
    this.style.setProperty("visibility", "visible");
  }

  closeLoader() {
    this.style.setProperty("opacity", 0);
    this.style.setProperty("visibility", "hidden");
  }


  connectedCallback() {
    window.addEventListener("kyosk-show-loader", this.showLoader.bind(this));
    window.addEventListener("kyosk-close-loader", this.closeLoader.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("kyosk-show-loader", this.showLoader.bind(this));
    window.removeEventListener("kyosk-close-loader", this.closeLoader.bind(this));
  }
}


export const { name, component } = registerComponent({
  name: "app-loader",
  component: Loader,
});