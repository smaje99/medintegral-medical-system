import { createContext, useCallback, useMemo, useState } from 'react';
import type { Table, RowSelectionState, Row } from '@tanstack/react-table';

import type { Data } from '@Types/data-request';

type Props<D extends object = {}> = {
    data: Data<D[]>;
    children: React.ReactNode;
}

export interface TableContextType<T> {
    rowSelection: RowSelectionState;
    getSelectedFlatRows: () => Row<T>[];
    setTable: React.Dispatch<React.SetStateAction<Table<T>>>;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
    dataForTable: Data<T[]>;
    setDataForTable: React.Dispatch<React.SetStateAction<Data<T[]>>>;
    rowSelectionSize: number;
    globalFilter: string;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const TableContext = createContext<TableContextType<any>>({
    rowSelection: {},
    getSelectedFlatRows: () => [],
    setTable: () => {},
    setRowSelection: () => {},
    dataForTable: {},
    setDataForTable: () => {},
    rowSelectionSize: 0,
    globalFilter: '',
    setGlobalFilter: () => {},
});

function TableProvider<T extends object = {}>({ data, children }: Props<T>) {
    const [dataForTable, setDataForTable] = useState<Data<T[]>>(null);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(null);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [table, setTable] = useState<Table<T>>(null);

    const getSelectedFlatRows = useCallback<TableContextType<T>['getSelectedFlatRows']>(
        () => table?.getSelectedRowModel().flatRows, [rowSelection]
    );

    const rowSelectionSize = useMemo<TableContextType<T>['rowSelectionSize']>(
        () => Object.keys(rowSelection ?? {}).length, [rowSelection]
    );

    const contextValue = useMemo<TableContextType<T>>(() => ({
        rowSelection,
        getSelectedFlatRows,
        setTable,
        setRowSelection,
        dataForTable: dataForTable || data,
        setDataForTable,
        rowSelectionSize,
        globalFilter,
        setGlobalFilter
    }), [globalFilter, rowSelection, dataForTable]);

    return (
        <TableContext.Provider value={contextValue}>
            {children}
        </TableContext.Provider>
    )
}

export default TableProvider;