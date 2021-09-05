const urlBase = `${window.baseUrl}/index.php?r=site/`;

export function api(input, options) {
  const currentOptions = options || {};
  const currentHeaders = currentOptions.headers || {};

  return fetch(`${urlBase}${input}`, {
    ...currentOptions,
    headers: {
      ...currentHeaders,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then((result) => result.json());
}