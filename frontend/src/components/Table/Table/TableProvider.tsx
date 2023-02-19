import { createContext, useCallback, useMemo, useState } from 'react';
import { Table, RowSelectionState } from '@tanstack/react-table';

import type { TableContextType } from './Table.types';

export const TableContext = createContext<TableContextType<any>>({
    rowSelection: {},
    getSelectedFlatRows: () => [],
    setTable: () => {},
    setRowSelection: () => {}
});

function TableProvider<T extends object = {}>({ children }: { children: React.ReactNode }) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(null);
    const [table, setTable] = useState<Table<T>>(null);

    const getSelectedFlatRows = useCallback(
        () => table?.getSelectedRowModel().flatRows, [rowSelection]
    );

    const contextValue = useMemo(() => ({
        rowSelection,
        getSelectedFlatRows,
        setTable,
        setRowSelection
    }), [rowSelection]);

    return (
        <TableContext.Provider value={contextValue}>
            {children}
        </TableContext.Provider>
    )
}

export default TableProvider;