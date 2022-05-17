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

export class HttpClient {
  /**
   * @param url url that will be used as request. it can be string Request object or URL object.
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

  private defaultOptions: HttpOptions | undefined;
  constructor(defaultOptions?: HttpOptions) {
    this.defaultOptions = defaultOptions;
  }
  static create(defaultOptions?: HttpOptions) {
    return new HttpClient(defaultOptions);
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
    const response = await executeRequest(request, requestTimeout);
    return validateResponse(options, response, request);
  }
}
