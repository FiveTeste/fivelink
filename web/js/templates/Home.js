class HomeTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("home-page");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(content);
  }

  connectedCallback() {}
}

export const { name, component } = registerComponent({
  name: "home-template",
  component: HomeTemplate,
});