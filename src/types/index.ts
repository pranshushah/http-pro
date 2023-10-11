import { responseTypes } from '../utils/constant';

export type HPValidator<ResponseType extends any = any> = (
  data: ResponseType,
  options?: HValidationOptions,
  schema?: any
) => Promise<ResponseType>;

export type HValidationOptions = {
  /**
   * @default 'async'
   */
  mode?: 'async' | 'sync';
  /**
   * @description If true, the validation function will return the raw data instead of the parsed data.
   * @default true
   */
  raw?: boolean;
};

export type _BaseSearchParamsInit =
  | string
  | [string, string][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export type SearchParamsInit =
  | _BaseSearchParamsInit
  | [string | boolean | number, string | number | boolean][]
  | Record<string, string | boolean | number>;

export type Interceptors = {
  beforeRequest?: (request: Request) => Request | Promise<Request>;
  beforeError?: (response: Response, request: Request) => void | Promise<void>;
  afterResponse?: (
    response: Response,
    request: Request
  ) => Response | Promise<Response>;
};

export interface HttpOptions<ResponseType extends any = any>
  extends RequestInit {
  baseUrl?: string | URL;
  searchParams?: SearchParamsInit;
  timeout?: number;
  validateStatus?: (status: number) => boolean;
  validationSchema?: HPValidator;
  validationFunction?: HPValidator<ResponseType>;
  json?: unknown;
  interceptors?: Interceptors;
  validationOptions?: HValidationOptions;
  responseType?: keyof typeof responseTypes;
  fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}
export interface InternalHttpOptions<ResponseType extends any = any>
  extends HttpOptions<ResponseType> {
  headers: Headers;
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export interface HpResponse<ResponseData extends any> extends Response {
  data: ResponseData;
}

export type Input = string | Request | URL;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
