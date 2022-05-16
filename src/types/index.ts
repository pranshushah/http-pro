export interface AdditionalHttpOptions {
  timeout?: number;
  validateStatus?: (status: number) => boolean;
}

export interface HttpOptions extends RequestInit, AdditionalHttpOptions {
  json?: unknown;
  baseUrl?: string;
}
