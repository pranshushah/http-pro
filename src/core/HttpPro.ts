import {
  AdditionalHttpOptions,
  HttpMethod,
  HttpOptions,
  Input,
} from '../types';
import { executeRequest } from '../utils/executeRequest';
import { getRequestTimeout } from '../utils/getRequestTimeout';
import { joinUrl } from '../utils/joinUrl';
import { mergeHeaders, mergeOptions } from '../utils/mergeOptions';
import { stringifyJson } from '../utils/stringifyJson';
import { validateResponse } from '../utils/validateResponse';

export class HttpPro {
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
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
    return await this._fetch(x, 'GET', httpOptions);
  }

  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async post(
    request: Request,
    options?: AdditionalHttpOptions
  ): Promise<Response>;
  async post(url: URL, httpOptions?: HttpOptions): Promise<Response>;
  async post(url: string, httpOptions?: HttpOptions): Promise<Response>;
  async post(x: Input, httpOptions?: HttpOptions) {
    return await this._fetch(x, 'POST', httpOptions);
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async put(
    request: Request,
    options?: AdditionalHttpOptions
  ): Promise<Response>;
  async put(url: URL, httpOptions?: HttpOptions): Promise<Response>;
  async put(url: string, httpOptions?: HttpOptions): Promise<Response>;
  async put(x: Input, httpOptions?: HttpOptions) {
    return await this._fetch(x, 'PUT', httpOptions);
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async patch(
    request: Request,
    options?: AdditionalHttpOptions
  ): Promise<Response>;
  async patch(url: URL, httpOptions?: HttpOptions): Promise<Response>;
  async patch(url: string, httpOptions?: HttpOptions): Promise<Response>;
  async patch(x: Input, httpOptions?: HttpOptions) {
    return await this._fetch(x, 'PATCH', httpOptions);
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async delete(
    request: Request,
    options?: AdditionalHttpOptions
  ): Promise<Response>;
  async delete(url: URL, httpOptions?: HttpOptions): Promise<Response>;
  async delete(url: string, httpOptions?: HttpOptions): Promise<Response>;
  async delete(x: Input, httpOptions?: HttpOptions) {
    return await this._fetch(x, 'DELETE', httpOptions);
  }

  private defaultOptions: HttpOptions | undefined;
  constructor(defaultOptions?: HttpOptions) {
    this.defaultOptions = defaultOptions;
  }
  create(defaultOptions?: HttpOptions) {
    return new HttpPro(defaultOptions);
  }

  extend(extendedOptions: HttpOptions) {
    const mergedOptions = mergeOptions(extendedOptions, this.defaultOptions);
    return new HttpPro(mergedOptions);
  }

  private async _fetch(
    input: Input,
    method: HttpMethod,
    httpOptions?: HttpOptions
  ) {
    let request: Request;
    let requestTimeout: number | undefined;
    let options: HttpOptions | undefined;
    if (input instanceof Request) {
      const requestOptions: HttpOptions = {};
      requestOptions.headers = mergeHeaders(
        input.headers,
        this.defaultOptions?.headers
      );
      requestOptions.method = method;
      requestOptions.json = httpOptions?.json;
      stringifyJson(requestOptions);
      request = new Request(input, requestOptions);
      requestTimeout = getRequestTimeout(httpOptions);
      options = httpOptions;
    } else if (typeof input === 'string' || input instanceof URL) {
      const mergedHttpOptions = mergeOptions(httpOptions, this.defaultOptions);
      stringifyJson(mergedHttpOptions);
      const joinedUrl = joinUrl(input, mergedHttpOptions);
      options = { ...mergedHttpOptions };
      requestTimeout = getRequestTimeout(mergedHttpOptions);
      request = new Request(joinedUrl, {
        ...mergedHttpOptions,
        method,
      });
    } else {
      throw new TypeError('input can be type string or Request or URL object');
    }
    if (typeof options?.interceptors?.beforeRequest === 'function') {
      const tempRequest = await options.interceptors.beforeRequest(request);
      if (tempRequest instanceof Request) {
        request = tempRequest;
      }
    }
    const response = await executeRequest(request, requestTimeout);
    return validateResponse(options, response, request);
  }
}
