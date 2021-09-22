const urlBase = `${window.baseUrl}/index.php?r=site/`;

class FetchError extends Error {
  constructor(message, data) {
    super(message);
    
    this.message = message;
    this.data = data;
  }
}


function handleJson(response) {
  return response.json();
}

async function handleErrors(response) {
  if (!response.ok) {
    const result = await handleJson(response);
    throw new FetchError(response.statusText, result);
  }
  return response;
}

export async function api(input, options) {
  const currentOptions = options || {};
  const currentHeaders = currentOptions.headers || {};

  const response = await fetch(`${urlBase}${input}`, {
    ...currentOptions,
    headers: {
      ...currentHeaders,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(handleErrors);

  return handleJson(response);
}