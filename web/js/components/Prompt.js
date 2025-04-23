import { masks } from "../utils/masks.js";

class Prompt extends HTMLElement {
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


    const componentStyles = `
      .prompt {
        width: min(35rem, 100%);
        background-color: var(--color-modal-background);
        border-radius: 1rem;
        box-shadow: var(--modal-shadow);
        overflow: hidden;
      }

      .prompt__content {
        padding: 1.5rem;
      }

      .prompt__content-text {
        font-family: var(--font-poppins);
        text-align: center;
        color: var(--color-primary-text);
      }

      .prompt__button {
        background: transparent;
        border: none;
        outline: 0;
        width: 100%;
        height: 4.5rem;
        cursor: pointer;
        border-top: 1px solid var(--color-gray-soft);
        font-family: var(--font-poppins);
        font-size: 1.6rem;
        color: var(--color-modal-button-text);
        text-transform: uppercase;
        transition: background 0.2s ease;
      }
      
      .prompt__button:hover {
        background: var(--color-modal-button-hover-background);
      }

      .prompt__input {
        position: relative;
        display: flex;
        z-index: 1;
        flex: 1;
        height: 5rem;
        padding: 0.2rem;
        margin: auto;
        margin-bottom: 1rem;
        box-sizing: border-box;
        border-radius: 0.5rem;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
      }

      .prompt__input::after {
        content: "";
        position: absolute;
        z-index: -1;
        bottom: 0;
        left: 0;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0.8;
        border-radius: inherit;
        background: var(--color-gray-dark);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
      }

      .prompt__input:focus-within {
        padding: 0.3rem;
      }

      .prompt__input:focus-within::after {
        background: var(--background-gradient);
        -webkit-filter: blur(0.1rem);
        -moz-filter: blur(0.1rem);
        -o-filter: blur(0.1rem);
        -ms-filter: blur(0.1rem);
        filter: blur(0.1rem);
      }

      .prompt__input input {
        flex: 1;
        outline: 0;
        border: 0;
        padding: 0 1rem;
        font-family: var(--font-poppins);
        font-size: 1.6rem;
        color: var(--color-gray-dark);
        -moz-appearance: textfield;
      }

      .prompt__input input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `;
    const styleElement = html`<style>${componentStyles}</style>`;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(styleElement);
  }

  handleMask(maskType) {
    return (event) => {
      let inputValue = event.target.value;
      inputValue = inputValue ? inputValue : "";

      const maskedValue = masks[maskType](inputValue);

      event.target.value = maskedValue;
    }
  }

  createInput(type, mask) {
    const input = document.createElement("input");
    input.required = true;

    if (type === "numeric") {
      input.setAttribute("pattern", "\\d*");
      input.setAttribute("inputmode", "numeric");
    }

    if (mask) {
      if (mask === "phone") {
        input.setAttribute("pattern", "\\d*");
        input.setAttribute("inputmode", "numeric");
      }

      input.addEventListener("input", this.handleMask(mask));
    }
    
    return input;
  }

  showPrompt(event) {
    const { 
      text,
      inputMask,
      inputType,
      confirmText,
      cancelText,
      onConfirm, 
      onCancel
    } = event.detail;

    const htmlStr = html`
      <div class="prompt__content">
        <div class="prompt__content-text">
          <p>${text}</p>
        </div>
        <div class="prompt__input"></div>
      </div>
    `;

    const inputContainer = htmlStr.querySelector(".prompt__input");
    const input = this.createInput(inputType, inputMask);
    inputContainer.appendChild(input);

    const container = document.createElement('div');

    input.addEventListener('keypress',(...args)=>{
      if(args[0].key === 'Enter'){
        buttonConfirm.click();
      }
    });

    const buttonConfirm = document.createElement('button');
    buttonConfirm.textContent = confirmText;
    buttonConfirm.classList.add("prompt__button");
    buttonConfirm.addEventListener("click", (...args) => {
      this.closePrompt(container);
      if (onConfirm) {
        const inputValue = input.value;
        onConfirm({ value: inputValue });
      }
    });

    const buttonCancel = document.createElement('button');
    buttonCancel.textContent = cancelText;
    buttonCancel.classList.add("prompt__button");
    buttonCancel.addEventListener("click", (...args) => {
      this.closePrompt(container);
      if (onCancel) onCancel.apply(this, args);
    });

    container.classList.add("prompt");
    container.appendChild(htmlStr);
    container.appendChild(buttonConfirm);
    container.appendChild(buttonCancel);

    this.shadowRoot.appendChild(container);
    this.style.opacity = 1;
    this.style.visibility = "visible";
  }

  closePrompt(element) {
    element.remove();

    const childs = this.shadowRoot.querySelectorAll(".prompt");
    const childCount = childs.length;

    if (childCount <= 0) {
      this.style.opacity = 0;
      this.style.visibility = "hidden";
    }
  }


  connectedCallback() {
    window.addEventListener("kyosk-show-prompt", this.showPrompt.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("kyosk-show-prompt", this.showPrompt.bind(this));
  }
}


export const { name, component } = registerComponent({
  name: "prompt-modal",
  component: Prompt,
});
