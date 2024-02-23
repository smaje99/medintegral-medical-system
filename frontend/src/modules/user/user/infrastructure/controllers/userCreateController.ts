import { toast } from 'sonner';

import { PersonNotFound, PersonUnderage } from '@/modules/person/domain/personErrors';
import { InternalServerError } from '@/modules/shared/domain/errors';
import { RoleNotFound } from '@/modules/user/role/domain/roleErrors';

import { UserCreate } from '../../application';
import { PersonAssociatedWithUserSaveValues } from '../../domain';
import { UserAlreadyExists } from '../../domain/userErrors';

export class UserCreateController {
  constructor(private readonly userCreate: UserCreate) {}

  async run(
    userIn: PersonAssociatedWithUserSaveValues,
    setOpenCreateUserSheet: (isOpen: boolean) => void,
  ): Promise<void> {
    const toastId = toast("User create's toast");
    toast.loading('Creando usuario...', { id: toastId });

    try {
      const user = await this.userCreate.run(userIn);

      if (user) {
        toast.success(`Usuario ${user.username} creado con éxito`, { id: toastId });
        setOpenCreateUserSheet(false);
      }
    } catch (error) {
      if (
        error instanceof UserAlreadyExists ||
        error instanceof PersonUnderage ||
        error instanceof PersonNotFound ||
        error instanceof RoleNotFound ||
        error instanceof InternalServerError
      ) {
        toast.error(error.message, { id: toastId });
      }
    }
  }
}
