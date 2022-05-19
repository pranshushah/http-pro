import { HttpPro } from './core';
import { HttpProInstance } from './types';
export * from './types';
export * from './Error';

const hp = new HttpPro() as HttpProInstance;
hp.create = HttpPro.create;

export { hp };
export default hp;
