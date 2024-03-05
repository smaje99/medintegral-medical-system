import { toast } from 'sonner';

import {
  InternalServerError,
  RequestValidationError,
} from '@/modules/shared/domain/errors';

import { RoleCreate } from '../../application/roleCreate';
import { RoleSaveDtoType } from '../../domain';
import { RoleAlreadyExists } from '../../domain/roleErrors';

export class RoleCreateController {
  constructor(private readonly roleCreate: RoleCreate) {}

  async run(
    roleIn: RoleSaveDtoType,
    setOpenSheet: (isOpen: boolean) => void,
  ): Promise<void> {
    const toastId = toast("Role create's toast");
    toast.loading('Creando rol...', { id: toastId });

    try {
      const role = await this.roleCreate.run(roleIn);
      if (role) {
        toast.success(`Rol ${role.name} creado`, { id: toastId });
        setOpenSheet(false);
      }
    } catch (error) {
      if (
        error instanceof RoleAlreadyExists ||
        error instanceof RequestValidationError ||
        error instanceof InternalServerError
      ) {
        toast.error(error.message, { id: toastId });
      }
      toast.error('Error inesperado', { id: toastId });
    }
  }
}
