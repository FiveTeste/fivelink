export function fireEvent(type, value) {
  window.dispatchEvent(new CustomEvent(`kyosk-${type}`, { detail: value }));
}