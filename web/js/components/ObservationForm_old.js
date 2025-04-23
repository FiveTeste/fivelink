class ObservationForm extends HTMLElement {
  constructor() {
    super();

    const styles = html`
      <style>
        .content {
          padding: 0 0.5rem;
        }

        .content .content__title {
          color: var(--color-primary-text);
          font-weight: 600;
          padding: 0 0.5rem;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .input .input__label {
          color: var(--color-primary-text);
          font-size: 1.4rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .input .input__field {
          width: 100%;
          min-height: 8rem;
          padding: 0.5rem;
          box-sizing: border-box;
        }
      </style>
    `;

    const htmlString = html`
      <div class="content">
        <strong class="content__title">Observação:</strong>
        <div class="content__input input">
          <span class="input__label">Alguma observação sobre o pedido?</span>
          <textarea class="input__field"></textarea>
        </div>
      </div>
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(styles);
    shadow.appendChild(htmlString);
  }

  handleChange(e) {
    const field = this.shadowRoot.querySelector(".input__field");
    const value = field ? field.value : "";

    const detail = { value };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  connectedCallback() {
    const field = this.shadowRoot.querySelector(".input__field");
    field.addEventListener("change", this.handleChange.bind(this));

    fireEvent("toggle-form-slider", { enabled: true });
  }

  disconnectedCallback() {
    const field = this.shadowRoot.querySelector(".input__field");
    field.removeEventListener("change", this.handleChange.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "observation-form",
  component: ObservationForm
});