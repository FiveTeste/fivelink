class ProductsTemplate extends HTMLElement {
  constructor() {
    super();

    const content = html`
      <style>
        .content {
          padding: 0 0.5rem;
        }
      </style>
      <ul class="content">
        <slot name="items"></slot>
      </ul>
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(content);
  }
  
  connectedCallback() {}

  disconnectedCallback() {}
}

export const { name, component } = registerComponent({
  name: "products-template",
  component: ProductsTemplate,
});
