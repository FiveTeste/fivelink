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

export function createHtmlElement(strings, ...values) {
  const htmlString = strings.reduce((acc, item, index) => {
    const newHtml = `${acc}${item}`;
    if (index > values.length - 1) return newHtml;

    return `${newHtml}${values[index]}`;
  }, "");

  return document.createRange().createContextualFragment(htmlString);
}

export function fireEvent(type, value) {
  window.dispatchEvent(new CustomEvent(`kyosk-${type}`, { detail: value }));
}