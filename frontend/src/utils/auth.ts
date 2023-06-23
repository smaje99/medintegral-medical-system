import type { Session } from 'next-auth';

import { Actions, Permissions } from '@/helpers/permissions';

/**
 * Check if the current user has a permission with its action.
 */
export function hasPermission(
  session: Session,
  permission: Permissions,
  action: Actions
): boolean {
  return !!session?.user.permissions?.[permission]?.includes(action);
}
