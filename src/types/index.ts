import { HttpAgent } from '../core';

export interface AdditionalHttpOptions {
  timeout?: number;
  validateStatus?: (status: number) => boolean;
  json?: unknown;
}

export interface HttpOptions extends RequestInit, AdditionalHttpOptions {
  baseUrl?: string | URL;
}

export type Input = string | Request | URL;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';

export interface HttpAgentInstance extends HttpAgent {
  create: (defaultOptions?: HttpOptions) => HttpAgent;
}
