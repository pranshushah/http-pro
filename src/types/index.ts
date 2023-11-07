import { responseTypes } from '../utils/constant';
import { AnyObjectSchema, InferType } from 'yup';
import { TypeOf, ZodSchema } from 'zod';
import { HttpProError, TimeoutError } from '../Error';

export type HPAnyObject = Record<string, any>;

export type HPValidator<ResponseType extends any = any> = (
  data: ResponseType,
  options?: HPValidationOptions,
  schema?: any
) => Promise<ResponseType>;

export type HPValidationOptions = {
  /**
   * @default 'async'
   */
  mode?: 'async' | 'sync';
  /**
   * @description If true, the validation function will return the raw data instead of the parsed data.
   * @default true
   */
  raw?: boolean;
};

export type HPBaseSearchParams =
  | string
  | [string, string][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export type HPSearchParams =
  | HPBaseSearchParams
  | [string | boolean | number, string | number | boolean][]
  | Record<string, string | boolean | number>;

export type HPInterceptors = {
  beforeRequest?: (request: Request) => Request | Promise<Request>;
  beforeError?: (
    error: HttpProError | TimeoutError
  ) => HttpProError | TimeoutError | Promise<HttpProError | TimeoutError>;
  afterResponse?: (
    response: Response,
    request: Request
  ) => Response | Promise<Response>;
};

export interface HttpOptions<
  ResponseType extends any = any,
  ValidationSchema extends
    | AnyObjectSchema
    | ZodSchema
    | HPAnyObject
    | undefined = undefined
> extends RequestInit {
  baseUrl?: string | URL;
  searchParams?: HPSearchParams;
  timeout?: number;
  validateStatus?: (status: number) => boolean;
  validationSchema?: ValidationSchema;
  validationFunction?: HPValidator<ResponseType>;
  data?: unknown;
  interceptors?: HPInterceptors;
  validationOptions?: HPValidationOptions;
  responseType?: keyof typeof responseTypes;
  fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}
export interface InternalHttpOptions<
  ResponseType extends any = any,
  ValidationSchema extends
    | AnyObjectSchema
    | ZodSchema
    | HPAnyObject
    | undefined = undefined
> extends HttpOptions<ResponseType, ValidationSchema> {
  headers: Headers;
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export interface HpResponse<
  ResponseData,
  ValidationSchema extends AnyObjectSchema | ZodSchema | HPAnyObject | undefined
> extends Response {
  data: IsUnknown<ResponseData> extends true
    ? ResolveValidationSchema<ResponseData, ValidationSchema>
    : IsAny<ResponseData> extends true
    ? ResolveValidationSchema<ResponseData, ValidationSchema>
    : ResponseData;
}

export type Input = string | Request | URL;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsUnknown<T> = unknown extends T ? true : false;

type ResolveValidationSchema<ResponseData, ValidationSchema> =
  ValidationSchema extends AnyObjectSchema
    ? InferType<ValidationSchema>
    : ValidationSchema extends ZodSchema
    ? TypeOf<ValidationSchema>
    : ResponseData;
