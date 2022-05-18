import { HttpClient } from './core';
import { HttpClientInstance } from './types';
export * from './types';
export * from './Error';

const httpClient = new HttpClient() as HttpClientInstance;
httpClient.create = HttpClient.create;

export { httpClient };
export default httpClient;
