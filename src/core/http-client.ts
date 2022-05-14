import { HttpOptions } from '../types';
import { executeRequest } from '../utils/executeRequest';
import { getRequestTimeout } from '../utils/getRequestTimeout';
import { joinUrl } from '../utils/joinUrl';
import { stringifyJson } from '../utils/stringifyJson';
import { validateResponse } from '../utils/validateResponse';

export class HttpClient {
  /**
   * @param url url that will be used as request
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  static async get(url: string, httpOptions?: HttpOptions) {
    const headers = new Headers(httpOptions?.headers);

    const shallowHttpOptions = { ...httpOptions };

    stringifyJson(headers, httpOptions);
    const joinedUrl = joinUrl(url, httpOptions);
    const requestTimeout = getRequestTimeout(httpOptions);

    const request = new Request(joinedUrl, {
      ...httpOptions,
      headers,
      method: 'GET',
    });

    const response = await executeRequest(request, requestTimeout);
    return validateResponse(shallowHttpOptions, response, request);
  }
  /**
   * @param url url
   * @param body object you want to pass as json data.
   * @param additionalOptions some additional [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) about request
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  static async post(
    url: RequestInfo,
    body?: object,
    additionalOptions?: RequestInit
  ) {
    const headers = new Headers(additionalOptions?.headers);
    headers.append('Content-Type', 'application/json');
    const request = new Request(url, {
      ...additionalOptions,
      method: 'POST',
      body: body ? JSON.stringify(body) : null,
      headers: headers,
    });
    return await fetch(request);
  }
  /**
   * @param url url-string and if you are working with URL object use `.toString()` method
   * @param body object you want to pass as json data.
   * @param additionalOptions some additional [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) about request
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  static async patch(
    url: RequestInfo,
    body?: object,
    additionalOptions?: RequestInit
  ) {
    const headers = new Headers(additionalOptions?.headers);
    headers.append('Content-Type', 'application/json');
    const request = new Request(url, {
      ...additionalOptions,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : null,
      headers: headers,
    });
    return await fetch(request);
  }
  /**
   * @param url url-string and if you are working with URL object use `.toString()` method
   * @param additionalOptions some additional [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) about request
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  static async delete(url: RequestInfo, additionalOptions?: RequestInit) {
    const headers = new Headers(additionalOptions?.headers);
    headers.append('Accept', 'application/json');
    const request = new Request(url, {
      ...additionalOptions,
      method: 'DELETE',
      headers: headers,
    });
    return await fetch(request);
  }
}
