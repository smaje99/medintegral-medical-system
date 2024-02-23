import { APIBaseError } from '@/modules/shared/domain/errors';

export class UserAlreadyExists extends APIBaseError {
  static ERROR_TYPE = 'UserAlreadyExists';
}
