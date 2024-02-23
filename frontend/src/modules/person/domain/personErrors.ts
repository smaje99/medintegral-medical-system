import { APIBaseError } from '@/modules/shared/domain/errors';

export class PersonNotFound extends APIBaseError {
  static ERROR_TYPE = 'PersonNotFound';
}

export class PersonUnderage extends APIBaseError {
  static ERROR_TYPE = 'PersonUnderage';
}
