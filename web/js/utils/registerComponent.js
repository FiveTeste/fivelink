import { appStore } from "../store/app.js";

export function registerComponent({ name, component }) {
  const isDefined = customElements.get(name);
  if (!isDefined) {
    component.prototype.store = appStore;
    customElements.define(name, component);
  }

  return {
    name,
    component
  }
}