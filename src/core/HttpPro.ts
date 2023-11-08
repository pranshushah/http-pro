import {
  HPAnyObject,
  HpResponse,
  HttpMethod,
  HttpOptions,
  Input,
} from '../types';
import { addAcceptHeader } from '../utils/AcceptHeaders';
import { addDataInResponse } from '../utils/addResponseData';
import { addSearchParams } from '../utils/addSearchParams';
import { executeRequest } from '../utils/executeRequest';
import { joinUrl } from '../utils/joinUrl';
import { mergeHeaders, mergeOptions } from '../utils/mergeOptions';
import { stringifyJson } from '../utils/stringifyJson';
import { validateResponse } from '../utils/validateResponse';
import { validateTimeout } from '../utils/validateTimeout';
import { AnyObjectSchema } from 'yup';
import { ZodSchema } from 'zod';

export class HttpPro {
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object but with additional data field that contains responseData.
   */
  async get<
    ResponseData,
    ValidationSchema extends AnyObjectSchema = AnyObjectSchema
  >(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async get<ResponseData, ValidationSchema extends ZodSchema = ZodSchema>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async get<ResponseData, ValidationSchema extends HPAnyObject = HPAnyObject>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, HPAnyObject>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async get<ResponseData>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData>
  ): Promise<HpResponse<ResponseData, undefined>>;
  async get<
    ResponseData extends any = any,
    ValidationSchema extends
      | AnyObjectSchema
      | ZodSchema
      | HPAnyObject
      | undefined = undefined
  >(x: Input, httpOptions?: HttpOptions<ResponseData, ValidationSchema>) {
    return await this._fetch<ResponseData, ValidationSchema>(
      x,
      'GET',
      httpOptions
    );
  }

  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object but with additional data field that contains responseData.
   */
  async post<
    ResponseData,
    ValidationSchema extends AnyObjectSchema = AnyObjectSchema
  >(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async post<ResponseData, ValidationSchema extends ZodSchema = ZodSchema>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async post<ResponseData, ValidationSchema extends HPAnyObject = HPAnyObject>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, HPAnyObject>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async post<ResponseData>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData>
  ): Promise<HpResponse<ResponseData, undefined>>;
  async post<
    ResponseData extends any = any,
    ValidationSchema extends
      | AnyObjectSchema
      | ZodSchema
      | HPAnyObject
      | undefined = undefined
  >(x: Input, httpOptions?: HttpOptions<ResponseData, ValidationSchema>) {
    return await this._fetch<ResponseData, ValidationSchema>(
      x,
      'POST',
      httpOptions
    );
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object but with additional data field that contains responseData.
   */
  async put<
    ResponseData,
    ValidationSchema extends AnyObjectSchema = AnyObjectSchema
  >(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async put<ResponseData, ValidationSchema extends ZodSchema = ZodSchema>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async put<ResponseData, ValidationSchema extends HPAnyObject = HPAnyObject>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, HPAnyObject>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async put<ResponseData>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData>
  ): Promise<HpResponse<ResponseData, undefined>>;
  async put<
    ResponseData extends any = any,
    ValidationSchema extends
      | AnyObjectSchema
      | ZodSchema
      | HPAnyObject
      | undefined = undefined
  >(x: Input, httpOptions?: HttpOptions<ResponseData, ValidationSchema>) {
    return await this._fetch<ResponseData, ValidationSchema>(
      x,
      'PUT',
      httpOptions
    );
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object but with additional data field that contains responseData.
   */
  async patch<
    ResponseData,
    ValidationSchema extends AnyObjectSchema = AnyObjectSchema
  >(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async patch<ResponseData, ValidationSchema extends ZodSchema = ZodSchema>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async patch<ResponseData, ValidationSchema extends HPAnyObject = HPAnyObject>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, HPAnyObject>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async patch<ResponseData>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData>
  ): Promise<HpResponse<ResponseData, undefined>>;
  async patch<
    ResponseData extends any = any,
    ValidationSchema extends
      | AnyObjectSchema
      | ZodSchema
      | HPAnyObject
      | undefined = undefined
  >(x: Input, httpOptions?: HttpOptions<ResponseData, ValidationSchema>) {
    return await this._fetch<ResponseData, ValidationSchema>(
      x,
      'PATCH',
      httpOptions
    );
  }
  /**
   * @param url url that will be used as request. it can be string, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
   * @param httpOptions same [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API but with additional functionality
   * @returns fetch apis [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object but with additional data field that contains responseData.
   */
  async delete<
    ResponseData,
    ValidationSchema extends AnyObjectSchema = AnyObjectSchema
  >(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async delete<ResponseData, ValidationSchema extends ZodSchema = ZodSchema>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async delete<
    ResponseData,
    ValidationSchema extends HPAnyObject = HPAnyObject
  >(
    x: Input,
    httpOptions?: HttpOptions<ResponseData, HPAnyObject>
  ): Promise<HpResponse<ResponseData, ValidationSchema>>;
  async delete<ResponseData>(
    x: Input,
    httpOptions?: HttpOptions<ResponseData>
  ): Promise<HpResponse<ResponseData, undefined>>;
  async delete<
    ResponseData extends any = any,
    ValidationSchema extends
      | AnyObjectSchema
      | ZodSchema
      | HPAnyObject
      | undefined = undefined
  >(x: Input, httpOptions?: HttpOptions<ResponseData, ValidationSchema>) {
    return await this._fetch<ResponseData, ValidationSchema>(
      x,
      'DELETE',
      httpOptions
    );
  }

  private _defaultOptions: HttpOptions | undefined = {
    responseType: 'json',
    validationOptions: { mode: 'async', raw: true },
  };

  // useful for calling interceptors outside of try block of _fetch method.
  private _interceptors: HttpOptions['interceptors'] = {};
  // useful for using outside of try block of _fetch method.
  private _request: globalThis.Request = new globalThis.Request('');

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

  private async _fetch<
    ResponseData extends any,
    ValidationSchema extends
      | AnyObjectSchema
      | ZodSchema
      | HPAnyObject
      | undefined = undefined
  >(
    input: Input,
    method: HttpMethod,
    httpOptions?: HttpOptions<ResponseData, ValidationSchema>
  ) {
    try {
      let request: globalThis.Request;
      const options = mergeOptions<ResponseData>(
        httpOptions,
        this._defaultOptions
      );
      this._interceptors = options.interceptors || {};
      const abortController = new globalThis.AbortController();
      options.timeout = validateTimeout(options.timeout);
      if (options.timeout !== undefined) {
        options.signal = abortController.signal; // if you provide timeout, default signal provided by user will be ignored.
      }
      options.method = method;
      stringifyJson(options);
      if (input instanceof globalThis.Request) {
        options.headers = mergeHeaders(input.headers, options.headers);
        request = new globalThis.Request(input, options);
      } else if (typeof input === 'string' || input instanceof globalThis.URL) {
        const joinedUrl = joinUrl(input, options);
        const urlWithParams = addSearchParams(joinedUrl, options);
        request = new globalThis.Request(
          urlWithParams as unknown as RequestInfo,
          options
        );
      } else {
        throw new TypeError(
          'input can be type string or Request or URL object'
        );
      }
      addAcceptHeader(options);
      if (typeof options?.interceptors?.beforeRequest === 'function') {
        const tempRequest = await options.interceptors.beforeRequest(request);
        if (tempRequest instanceof globalThis.Request) {
          request = tempRequest;
        }
      }
      this._request = request;
      let originalresponse = await executeRequest(
        request,
        options,
        abortController
      );
      originalresponse = await validateResponse(
        options,
        originalresponse,
        request
      );
      const finalResponse = await addDataInResponse<ResponseData>(
        originalresponse,
        options
      );
      return finalResponse;
    } catch (e) {
      if (typeof this._interceptors?.beforeError === 'function') {
        await this._interceptors.beforeError(e, this._request);
      }
      throw e;
    }
  }
}
