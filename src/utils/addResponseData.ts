import { HpResponse, InternalHttpOptions } from '../types';

export async function addDataInResponse<ResponseType extends any = any>(
  response: Response,
  options: InternalHttpOptions<ResponseType>
) {
  //@ts-ignore
  let finalResponse: HpResponse<ResponseType> = response.clone();
  let data: ResponseType;
  try {
    if (options.responseType) {
      data = (await response[
        options.responseType
      ]()) as unknown as ResponseType;
    } else {
      data = (await response.json()) as ResponseType;
    }
  } catch (e) {
    // if something goes wrong while parsing data we return empty object.
    data = {} as ResponseType;
  }
  if (typeof options.validationFunction === 'function') {
    data = await options.validationFunction(
      data,
      options.validationOptions,
      options.validationSchema
    );
  }
  Object.defineProperty(finalResponse, 'data', {
    value: data,
    writable: false,
  });

  return finalResponse;
}
