export interface AdditionalHttpOptions {
  timeout?: number;
  validateStatus?: (status: number) => boolean;
  json?: unknown;
  interceptors?: Interceptors;
}

export type Interceptors = {
  beforeRequest?: (request: Request) => Request;
  beforeError?: (response: Response, request: Request) => void;
  afterResponse?: (response: Response, request: Request) => Response;
};

export interface HttpOptions extends RequestInit, AdditionalHttpOptions {
  baseUrl?: string | URL;
}

export type Input = string | Request | URL;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
