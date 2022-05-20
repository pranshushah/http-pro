export interface AdditionalHttpOptions {
  timeout?: number;
  validateStatus?: (status: number) => boolean;
  json?: unknown;
  interceptors?: Interceptors;
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

export interface HttpOptions extends RequestInit, AdditionalHttpOptions {
  baseUrl?: string | URL;
  searchParams?: SearchParamsInit;
}

export type Input = string | Request | URL;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
