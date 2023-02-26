import { createContext, useCallback, useMemo, useState } from 'react';
import { Table, RowSelectionState } from '@tanstack/react-table';

import type { Data } from '@Types/data-request';

import type { TableContextType, TableProviderProps } from './Table.types';

export const TableContext = createContext<TableContextType<any>>({
    rowSelection: {},
    getSelectedFlatRows: () => [],
    setTable: () => {},
    setRowSelection: () => {},
    dataForTable: {},
    setDataForTable: () => {}
});

function TableProvider<T extends object = {}>({ data, children }: TableProviderProps<T>) {
    const [dataForTable, setDataForTable] = useState<Data<T[]>>(null);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(null);
    const [table, setTable] = useState<Table<T>>(null);

    const getSelectedFlatRows = useCallback(
        () => table?.getSelectedRowModel().flatRows, [rowSelection]
    );

    const contextValue = useMemo(() => ({
        rowSelection,
        getSelectedFlatRows,
        setTable,
        setRowSelection,
        dataForTable: dataForTable || data,
        setDataForTable
    }), [rowSelection, dataForTable]);

    return (
        <TableContext.Provider value={contextValue}>
            {children}
        </TableContext.Provider>
    )
}

export default TableProvider;