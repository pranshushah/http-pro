import { HttpClient } from '../core';

export interface AdditionalHttpOptions {
  timeout?: number;
  validateStatus?: (status: number) => boolean;
  json?: unknown;
}

export interface HttpOptions extends RequestInit, AdditionalHttpOptions {
  baseUrl?: string | URL;
}

export type Input = string | Request | URL;

export interface HttpClientInstance extends HttpClient {
  create: (defaultOptions?: HttpOptions) => HttpClient;
}
