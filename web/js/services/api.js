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
  const result = await handleJson(response);
  if (!response.ok) {
    throw new FetchError(response.statusText, result);
  }

  const error = result.error;
  if (error) {
    throw new FetchError("bad request", { message: error });
  }

  return result;
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

  return response;
}