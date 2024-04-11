import { roleGetAllController } from '@/modules/user/role/infrastructure/roleContainer';

import { CreateUserSheet } from './sections/CreateUserSheet';

export default async function CreateUserModal() {
  const roles = await roleGetAllController.run();

  return <CreateUserSheet roles={roles.map((role) => role.toPrimitives())} />;
}
