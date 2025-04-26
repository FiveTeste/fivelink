class FormSlider extends HTMLElement {
  constructor() {
    super();

    this.currentIndex = 0;

    const pageHtml = html`
      <style>
        .flex-container {
          display: flex;          
          flex-wrap: wrap;
          justify-content: space-evenly;          
        }

        #butons{
          position: fixed;
          bottom: 0px;
          background-color: #fff !important;
          padding: 10px 0px 10px 0px;
          width: -webkit-fill-available;
        }
        #butons::before{
          position: fixed;
          bottom: 0px;
          background-color: #fff !important;
        }
        #butons::after{
          position: fixed;
          bottom: 0px;
          background-color: #fff !important;
        }

        #container {
          display: flex;
          flex-direction: column;
          padding: 0 0.5rem;
          padding-bottom: 5rem; /* Adiciona espaço para evitar que o botão sobreponha o último produto */
        }
        
        #next-button, #prev-button {
          width: 45%;
          height: 4.5rem;
          font-size: 1.8rem;
          align-self: flex-end;
          cursor: pointer;          
          outline: 0;
          background: var(--background-gradient);
          border-radius: 0.5rem;
          color: var(--color-secondary-text);
          font-weight: 600;
          font-family: var(--font-poppins);
          transition: background 1s ease;
          z-index: 1;
        }
        #next-button{
          border: none;
        }

        #next-button::before, #prev-button::before {
          /*position: absolute;*/
          content: "";
          border-radius: 0.5rem;
          background: var(--background-gradient-inverted);
          z-index: -1;
          transition: opacity 0.3s linear;
          opacity: 0;
        }

        #prev-button {
          z-index: initial;
          background-clip: red;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        #prev-button::after {
          content: "";
          top: 0.2rem;
          right: 0.2rem;
          left: 0.2rem;
          bottom: 0.2rem;
          z-index: -1;
          background: #fff;
          border-radius: 0.5rem;
        }

        #prev-button::before {
          opacity: 1;
          background: var(--background-gradient);
        }

        #next-button:not(:disabled):hover::before {
          opacity: 1;
        }

        #next-button:disabled {
          opacity: 0.75;
        }
      </style>
      <div id="container">
        <div id="item">
        </div>

        <div id="butons" class="flex-container">
          <button class="col-md-5" type="button" id="prev-button">Anterior</button>
          <button class="col-md-5" type="button" id="next-button">Próximo</button>
        </div>
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

    const nextButton = this.shadowRoot.getElementById("next-button");
    if (index === this.items.length -1) {
      nextButton.textContent = "Adicionar";
    } else {
      nextButton.textContent = "Próximo";
    }

    const prevButton = this.shadowRoot.getElementById("prev-button");
    if (index <= 0) {
      prevButton.style.setProperty("display", "none");
    } else {
      prevButton.style.removeProperty("display");
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

  handlePrev() {
    const prevIndex = this.currentIndex - 1;

    if (prevIndex >= 0) {
      this.showItem(prevIndex);
      this.currentIndex = prevIndex;
    }
  }

  handleToggleNext(event) {
    const { enabled } = event.detail;

    const button = this.shadowRoot.getElementById("next-button");
    button.disabled = !enabled;
  }

  connectedCallback() {
    this.showItem();

    const nextButton = this.shadowRoot.getElementById("next-button");
    const prevButton = this.shadowRoot.getElementById("prev-button");

    nextButton.addEventListener("click", this.handleNext.bind(this));
    prevButton.addEventListener("click", this.handlePrev.bind(this));

    
  }

  disconnectedCallback() {
    const nextButton = this.shadowRoot.getElementById("next-button");
    const prevButton = this.shadowRoot.getElementById("prev-button");

    nextButton.removeEventListener("click", this.handleNext.bind(this));
    prevButton.removeEventListener("click", this.handlePrev.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "form-slider",
  component: FormSlider,
});
