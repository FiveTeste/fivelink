class SvgIcon extends HTMLElement {
  static get observedAttributes() {
    return ['src'];
  }

  constructor() {
    super();

    const styles = html`
      <style>
        svg {
          pointer-events: none;
        }
      </style>
    `;

    this.style.setProperty("pointer-events", "none");

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(styles);
  }

  async fetchIcon(src) {
    const finalUrl = `${window.baseUrl}/icons/${src}`;
    const response = await fetch(finalUrl);
    const svgStr = await response.text();

    const existent = Array.from(this.shadowRoot.children);
    existent.forEach((element) => {
      if (element instanceof HTMLStyleElement) return;
      element.remove();
    });
    
    const element = html`${svgStr}`;
    this.shadowRoot.appendChild(element);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src") {
      this.fetchIcon(newValue);
    }
  }
}

export const { name, component } = registerComponent({
  name: "svg-icon",
  component: SvgIcon
});