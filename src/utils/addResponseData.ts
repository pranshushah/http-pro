import type { HpResponse, InternalHttpOptions } from '../types/index.js';

export async function addDataInResponse<ResponseType = any>(
  response: Response,
  options: InternalHttpOptions
) {
  //@ts-ignore
  let finalResponse: HpResponse<ResponseType> = response.clone();
  finalResponse.data = {} as ResponseType;
  try {
    if (options.responseType) {
      finalResponse.data = (await response[
        options.responseType
      ]()) as unknown as ResponseType;
    } else {
      finalResponse.data = await response.json();
    }
  } catch (e) {
    // if something goes wrong while parsing data we return empty object.
    finalResponse.data = {} as ResponseType;
  }
  return finalResponse;
}
