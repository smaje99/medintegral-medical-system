import { AxiosRequestConfig, isAxiosError } from 'axios';

import config from '@/config';

import { APIBaseError, APIError, InternalServerError } from '../../domain/errors';

const baseURL = config.PUBLIC_API;

const timeout = 10_000; // 10 seconds

export const axiosConfig: AxiosRequestConfig = { baseURL, timeout };

/**
 * Error handler for Axios responses.
 * @param error - The error object received from Axios.
 * @param errors - List of custom error classes inheriting from APIBaseError
 * @throws {InternalServerError} - Thrown if the response status code is 500 or higher.
 * @throws {APIBaseError} - Thrown if a specific error is found in the server response.
 */
export function axiosErrorHandler(error: unknown, ...errors: (typeof APIBaseError)[]) {
  if (isAxiosError<APIError>(error) && error.response) {
    const { status, data } = error.response;

    if (status >= 500) {
      throw new InternalServerError();
    }

    errors.forEach((apiError) => {
      if (apiError.ERROR_TYPE === data.errorType) {
        throw new apiError(data.message);
      }
    });
  }
}
