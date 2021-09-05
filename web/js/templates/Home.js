class HomeTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("home-page");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  onChange(value) {
    console.log("alterou", value);
  }
  connectedCallback() {
    this.store.addListener(this.onChange);
    this.setAttribute("slot", "content");
  }
  disconnectedCallback() {
    this.store.removeListener(this.onChange);
  }
}

export const { name, component } = registerComponent({
  name: "home-template",
  component: HomeTemplate,
});