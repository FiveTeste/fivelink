class OptionalItem extends HTMLElement {
  static get observedAttributes() {
    return ['checked'];
  }

  constructor(){
    super();

    this.checked = false;

    const template = document.getElementById("optional-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleCheck(value) {
    const isChecked = eval(value);

    const container = this.shadowRoot.querySelector(".item");
    if (isChecked) {
      container.classList.add("checked");
    } else {
      container.classList.remove("checked");
    }
  }

  handleClick() {
    const newValue = !this.checked;

    this.handleCheck(newValue);
    const detail = { value: this.product };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
     this.handleCheck(newValue);
    }
  }

  connectedCallback() {
    this.style.setProperty("-webkit-tap-highlight-color", "transparent");
    this.addEventListener("click", this.handleClick.bind(this));
  }

  disconnectedCallback() {
  }
}

export const { name,component } = registerComponent({
  name: "optional-item",
  component: OptionalItem
})