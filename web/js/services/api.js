const urlBase = `${window.baseUrl}/index.php?r=site/`;

export function api(input, options) {
  return fetch(`${urlBase}${input}`, options).then((result) => result.json());
}