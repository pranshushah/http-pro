export const responseTypes = {
  arrayBuffer: '*/*',
  blob: '*/*',
  json: 'application/json',
  text: 'text/*',
  formData: 'multipart/form-data',
} as const;
export interface AdditionalHttpOptions<ResponseData extends any = any> {
  timeout?: number;
  validateStatus?: (status: number) => boolean;
  json?: unknown;
  interceptors?: Interceptors;
  data?: ResponseData;
  responseType?: keyof typeof responseTypes;
}

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

export interface HttpOptions<ResponseData extends any = any>
  extends RequestInit,
    AdditionalHttpOptions<ResponseData> {
  baseUrl?: string | URL;
  searchParams?: SearchParamsInit;
}

export interface HpResponse<ResponseData extends any> extends Response {
  data: ResponseData;
}

export type Input = string | Request | URL;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
