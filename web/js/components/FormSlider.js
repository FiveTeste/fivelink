class FormSlider extends HTMLElement {
  constructor() {
    super();

    this.currentIndex = 0;

    const pageHtml = html`
      <style>
        #container {
          display: flex;
          flex-direction: column;
          padding: 0 0.5rem;
        }

        #next-button {
          width: 12rem;
          height: 3.5rem;
          margin-top: 1.5rem;
          align-self: flex-end;
          cursor: pointer;
          border: none;
          outline: 0;
          background: var(--color-confirm-button-background);
          border-radius: 0.5rem;
          color: #fff;
          font-weight: 600;
          font-family: var(--font-poppins);
          font-size: 1.4rem;
          transition: background .2s ease;
        }

        #next-button:not(:disabled):hover {
          background: var(--color-confirm-button-hover-background);
        }

        #next-button:disabled {
          opacity: 0.75;
        }
      </style>
      <div id="container">
        <div id="item">
        </div>
        <button type="button" id="next-button">Próximo</button>
      </div>
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(pageHtml);

    window.addEventListener("kyosk-toggle-form-slider", this.handleToggleNext.bind(this));
  }

  showItem(index = this.currentIndex) {
    const item = this.items[index];
    if (item) {
      const container = this.shadowRoot.getElementById("item");
      container.innerHTML = "";
      container.appendChild(item);
    }

    const button = this.shadowRoot.getElementById("next-button");
    if (index === this.items.length -1) {
      button.textContent = "Finalizar";
    } else {
      button.textContent = "Próximo";
    }
  }

  handleNext() {
    const newIndex = this.currentIndex + 1;

    if (newIndex < this.items.length) {
      this.showItem(newIndex);
      this.currentIndex = newIndex;
    } else if (newIndex === this.items.length) {
      this.dispatchEvent(new CustomEvent("finish"));
    }
  }

  handleToggleNext(event) {
    const { enabled } = event.detail;

    const button = this.shadowRoot.getElementById("next-button");
    button.disabled = !enabled;
  }

  connectedCallback() {
    this.showItem();

    const button = this.shadowRoot.getElementById("next-button");
    button.addEventListener("click", this.handleNext.bind(this));
  }

  disconnectedCallback() {
    const button = this.shadowRoot.getElementById("next-button");
    button.removeEventListener("click", this.handleNext.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "form-slider",
  component: FormSlider,
});
