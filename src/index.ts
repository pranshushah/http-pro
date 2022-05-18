import { HttpAgent } from './core';
import { HttpAgentInstance } from './types';
export * from './types';
export * from './Error';

const httpAgent = new HttpAgent() as HttpAgentInstance;
httpAgent.create = HttpAgent.create;

export { httpAgent };
export default httpAgent;
