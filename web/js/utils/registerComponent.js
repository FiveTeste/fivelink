import { appStore } from "../store/app.js";
import { loadIcons, unloadIcons } from "../utils/loadIcon.js";

export function registerComponent({ name, component }) {
  const isDefined = customElements.get(name);
  if (!isDefined) {
    const originalConnectedCallback = component.prototype.connectedCallback;
    component.prototype.connectedCallback = function(...args) {
      if (originalConnectedCallback) {
        originalConnectedCallback.apply(this, args);
      }
      const root = this.shadowRoot ? this.shadowRoot : this;
      loadIcons(root);
    }

    const originalDisconnectedCallback = component.prototype.disconnectedCallback;
    component.prototype.disconnectedCallback = function(...args) {
      if (originalDisconnectedCallback) {
        originalDisconnectedCallback.apply(this, args);
      }
      const root = this.shadowRoot ? this.shadowRoot : this;
      unloadIcons(root);
    }

    component.prototype.store = appStore;
    customElements.define(name, component);
  }

  return {
    name,
    component
  }
}