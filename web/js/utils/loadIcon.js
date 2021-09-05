const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type !== "attributes") return;

    const attributeName = mutation.attributeName;
    const newValue = mutation.target.getAttribute(attributeName);

    if (newValue === mutation.oldValue) return;

    loadIconAttribute(mutation.target, attributeName);
  })
});


function loadIconAttribute(element, attr) {
  const svgIcon = element.getSVGDocument().firstChild;
  if (!attr.startsWith("data-icon")) return;

  const attributeValue = element.getAttribute(attr);
  const replacedName = attr.replace(/^(data-icon-)/, "");
  svgIcon.setAttribute(replacedName, attributeValue);
}

function loadAttributes(element) {
  const attributeNames = element.getAttributeNames();
  
  attributeNames.forEach((attr) => {
    loadIconAttribute(element, attr);
  });
}



export function loadIcons(root = document) {
  const elements = root.querySelectorAll("object[data-type='svg-icon']");
  elements.forEach((element) => {
    element.onload = () => {
      loadAttributes(element);
      observer.observe(element, { attributes: true, attributeOldValue: true });
    }
  });
}

export function unloadIcons(root = document) {
  const elements = root.querySelectorAll("object[data-type='svg-icon']");
  elements.forEach((element) => {
    observer.disconnect(element);
  });
}
