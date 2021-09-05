class CategoriesTemplate extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("categories-page");
    const content = template.content.cloneNode(true);
    
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(content);
  }
  
  connectedCallback() {}

  disconnectedCallback() {}
}

export const { name, component } = registerComponent({
  name: "categories-template",
  component: CategoriesTemplate,
});
