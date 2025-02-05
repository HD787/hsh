export function blockingHttpRequest(url: string): string {
  const xhr = new XMLHttpRequest();
  let result = '';

  try {
    xhr.open('GET', url, false);
    xhr.send();

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