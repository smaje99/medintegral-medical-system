import { useContext } from 'react';

import { TableContext } from './TableProvider';
import type { TableContextType } from './Table.types';

export default function useTable<T>() {
    return useContext<TableContextType<T>>(TableContext);
}