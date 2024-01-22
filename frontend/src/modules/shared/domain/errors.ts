export type APIError = {
  readonly message: string;
  readonly errorType: string;
};

export class APIBaseError extends Error {
  static ERROR_TYPE: string;
}

export class InternalServerError extends Error {
  constructor() {
    super(
      'Lo sentimos, no se puede procesar la operación en estos momentos.\n' +
        'Inténtalo más tarde',
    );
  }
}
