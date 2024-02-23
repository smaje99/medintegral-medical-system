import { APIBaseError } from '@/modules/shared/domain/errors';

export class RoleAlreadyExists extends APIBaseError {
  static ERROR_TYPE = 'RoleAlreadyExists';
}

export class RoleNotFound extends APIBaseError {
  static ERROR_TYPE = 'RoleNotFound';
}
