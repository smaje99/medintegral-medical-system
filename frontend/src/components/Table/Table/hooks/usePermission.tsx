import { useContext } from 'react';

import { PermissionContext, type PermissionContextType } from './PermissionProvider';

export default function usePermission() {
  return useContext<PermissionContextType>(PermissionContext);
}
