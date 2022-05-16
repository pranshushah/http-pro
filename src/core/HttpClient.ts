import { AdditionalHttpOptions, HttpOptions, Input } from '../types';
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
  static async get(
    request: Request,
    options?: AdditionalHttpOptions
  ): Promise<Response>;
  static async get(url: URL, httpOptions?: HttpOptions): Promise<Response>;
  static async get(url: string, httpOptions?: HttpOptions): Promise<Response>;
  static async get(x: Input, httpOptions?: HttpOptions) {
    if (x instanceof Request) {
      const requestTimeout = getRequestTimeout(httpOptions);
      const response = await executeRequest(x, requestTimeout);
      return validateResponse(httpOptions, response, x);
    } else if (typeof x === 'string' || x instanceof URL) {
      const headers = new Headers(httpOptions?.headers);

      const shallowHttpOptions = { ...httpOptions };

      stringifyJson(headers, httpOptions);
      const joinedUrl = joinUrl(x, httpOptions);
      const requestTimeout = getRequestTimeout(httpOptions);

      const request = new Request(joinedUrl, {
        ...httpOptions,
        headers,
        method: 'GET',
      });

      const response = await executeRequest(request, requestTimeout);
      return validateResponse(shallowHttpOptions, response, request);
    } else {
      throw new TypeError('input can be type string or Request');
    }
  }
}
