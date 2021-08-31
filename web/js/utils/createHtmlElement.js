export function createHtmlElement(strings, ...values) {
  const htmlString = strings.reduce((acc, item, index) => {
    const newHtml = `${acc}${item}`;
    if (index > values.length - 1) return newHtml;

    return `${newHtml}${values[index]}`;
  }, "");

  return document.createRange().createContextualFragment(htmlString);
}