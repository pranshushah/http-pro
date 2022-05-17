import { AdditionalHttpOptions, HttpOptions, Input } from '../types';
import { executeRequest } from '../utils/executeRequest';
import { getRequestTimeout } from '../utils/getRequestTimeout';
import { joinUrl } from '../utils/joinUrl';
import { mergeHeaders, mergeOptions } from '../utils/mergeOptions';
import { stringifyJson } from '../utils/stringifyJson';
import { validateResponse } from '../utils/validateResponse';

export class HttpClient {
  /**
   * @param url url that will be used as request
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async get(
    request: Request,
    options?: AdditionalHttpOptions
  ): Promise<Response>;
  async get(url: URL, httpOptions?: HttpOptions): Promise<Response>;
  async get(url: string, httpOptions?: HttpOptions): Promise<Response>;
  async get(x: Input, httpOptions?: HttpOptions) {
    if (x instanceof Request) {
      const options: RequestInit = {};
      options.headers = mergeHeaders(x.headers, this.defaultOptions?.headers);
      options.method = 'GET';
      const request = new Request(x, options);
      const requestTimeout = getRequestTimeout(httpOptions);
      const response = await executeRequest(request, requestTimeout);
      return validateResponse(httpOptions, response, request);
    } else if (typeof x === 'string' || x instanceof URL) {
      const mergedHttpOptions = mergeOptions(httpOptions, this.defaultOptions);
      const shallowHttpOptions = { ...mergedHttpOptions };

      stringifyJson(mergedHttpOptions);
      const joinedUrl = joinUrl(x, mergedHttpOptions);
      const requestTimeout = getRequestTimeout(mergedHttpOptions);

      const request = new Request(joinedUrl, {
        ...mergedHttpOptions,
        method: 'GET',
      });

      const response = await executeRequest(request, requestTimeout);
      return validateResponse(shallowHttpOptions, response, request);
    } else {
      throw new TypeError('input can be type string or Request');
    }
  }

  protected defaultOptions: HttpOptions | undefined;
  constructor(defaultOptions?: HttpOptions) {
    this.defaultOptions = defaultOptions;
  }
  static create(defaultOptions?: HttpOptions) {
    return new HttpClient(defaultOptions);
  }
}
