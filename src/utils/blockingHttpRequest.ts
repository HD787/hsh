export function blockingHttpRequest(url: string): string {
  const xhr = new XMLHttpRequest();
  let result: string = '';
  const timeoutMs = 2000;

  const timer = setTimeout(() => {
    if (xhr.readyState !== 4) {
      xhr.abort();
      result = `curl: Timed out after ${timeoutMs} ms`;
    }
  }, timeoutMs);

  try {
    xhr.open('GET', url, false);
    xhr.send();

    clearTimeout(timer);

    if (xhr.status >= 200 && xhr.status < 300) {
      result = xhr.responseText;
    } else {
      result = `curl: Error ${xhr.status}: ${xhr.statusText}`;
    }
  } catch (err) {
    result = `curl: Failed to fetch ${url}: ${err}`;
  }

  return result;
}