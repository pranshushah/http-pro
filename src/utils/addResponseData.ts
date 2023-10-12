import { HpResponse, InternalHttpOptions } from '../types';

export async function addDataInResponse<ResponseType extends any = any>(
  response: Response,
  options: InternalHttpOptions<ResponseType>
) {
  //@ts-ignore
  let finalResponse: HpResponse<ResponseType> = response.clone();
  try {
    let data: ResponseType;
    if (options.responseType) {
      data = (await response[
        options.responseType
      ]()) as unknown as ResponseType;
    } else {
      data = await response.json();
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
  } catch (e) {
    // if something goes wrong while parsing data we return empty object.
    Object.defineProperty(finalResponse, 'data', {
      value: {},
      writable: false,
    });
  }
  return finalResponse;
}
