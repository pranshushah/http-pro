import { HttpPro } from './core/index.js';
export type {
  HpResponse,
  HttpMethod,
  HttpOptions,
  Input,
  Interceptors,
  SearchParamsInit,
} from './types/index.js';
export * from './Error/index.js';

const hp = new HttpPro();
export { hp };
export default hp;
