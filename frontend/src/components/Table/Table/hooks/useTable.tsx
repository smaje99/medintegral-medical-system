import { useContext } from 'react';

import { TableContext, type TableContextType } from './TableProvider';

export default function useTable<T extends object>() {
  return useContext<TableContextType<T>>(TableContext);
}
