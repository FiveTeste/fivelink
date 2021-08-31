export function registerComponent({ name, component }) {
  const isDefined = customElements.get(name);
  if (!isDefined) {
    customElements.define(name, component);
  }

  return {
    name,
    component
  }
}