import { useContext } from 'react';

import { TableContext, type TableContextType } from './TableProvider';

export default function useTable<T>() {
    return useContext<TableContextType<T>>(TableContext);
}