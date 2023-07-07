import { createContext, useMemo } from 'react';

import { Permissions } from '@/helpers/permissions';

type Props = {
  readonly permission: Permissions;
  children: React.ReactNode;
};

export interface PermissionContextType {
  readonly permission: Permissions;
}

export const PermissionContext = createContext<PermissionContextType>({
  permission: null,
});

const PermissionProvider: React.FC<Props> = ({ permission, children }) => {
  const values = useMemo<PermissionContextType>(() => ({ permission }), [permission]);

  return (
    <PermissionContext.Provider value={values}>{children}</PermissionContext.Provider>
  );
};

export default PermissionProvider;
