import { HttpMethod, HttpOptions, Input } from '../types';
import { addDataInResponse } from '../utils/addResponseData';
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
  async get<ResponseData extends any = {}>(
    x: Input,
    httpOptions?: HttpOptions
  ) {
    return await this._fetch<ResponseData>(x, 'GET', httpOptions);
  }

  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async post<ResponseData extends any = any>(
    x: Input,
    httpOptions?: HttpOptions
  ) {
    return await this._fetch<ResponseData>(x, 'POST', httpOptions);
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async put<ResponseData extends any = any>(
    x: Input,
    httpOptions?: HttpOptions
  ) {
    return await this._fetch<ResponseData>(x, 'PUT', httpOptions);
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async patch<ResponseData extends any = any>(
    x: Input,
    httpOptions?: HttpOptions
  ) {
    return await this._fetch<ResponseData>(x, 'PATCH', httpOptions);
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
   */
  async delete<ResponseData extends any = any>(
    x: Input,
    httpOptions?: HttpOptions
  ) {
    return await this._fetch<ResponseData>(x, 'DELETE', httpOptions);
  }

  private _defaultOptions: HttpOptions | undefined = { responseType: 'json' };
  constructor(defaultOptions?: HttpOptions) {
    this._defaultOptions = mergeOptions(defaultOptions, this._defaultOptions);
  }
  create(defaultOptions?: HttpOptions) {
    return new HttpPro(defaultOptions);
  }

  extend(extendedOptions?: HttpOptions) {
    const mergedOptions = mergeOptions(extendedOptions, this._defaultOptions);
    return new HttpPro(mergedOptions);
  }

  private async _fetch<ResponseData extends any>(
    input: Input,
    method: HttpMethod,
    httpOptions?: HttpOptions
  ) {
    let request: Request;
    const options = mergeOptions(httpOptions, this._defaultOptions);
    const requestTimeout: number | undefined = getRequestTimeout(options);
    options.method = method;
    stringifyJson(options);
    if (input instanceof Request) {
      options.headers = mergeHeaders(input.headers, options.headers);
      request = new Request(input, options);
    } else if (typeof input === 'string' || input instanceof URL) {
      const joinedUrl = joinUrl(input, options);
      request = new Request((joinedUrl as unknown) as RequestInfo, options);
    } else {
      throw new TypeError('input can be type string or Request or URL object');
    }
    if (typeof options?.interceptors?.beforeRequest === 'function') {
      const tempRequest = await options.interceptors.beforeRequest(request);
      if (tempRequest instanceof Request) {
        request = tempRequest;
      }
    }
    let response = await executeRequest(request, requestTimeout);
    response = await addDataInResponse<ResponseData>(response, options);
    return validateResponse(options, response, request);
  }
}
