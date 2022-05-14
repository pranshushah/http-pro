export interface HttpOptions extends RequestInit {
  json?: unknown;
  timeout?: number;
  baseUrl?: string;
  validateStatus?: (status: number) => boolean;
}
