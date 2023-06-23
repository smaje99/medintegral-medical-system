import type { Row, RowSelectionState, Table } from '@tanstack/react-table';
import { createContext, useCallback, useMemo, useState } from 'react';

import type { Data } from '@/types/data-request';

type Props<D extends object> = {
  data: Data<D[]>;
  children: React.ReactNode;
};

export interface TableContextType<T extends object> {
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

function createTableContext<T extends object>() {
  return createContext<TableContextType<T>>({
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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createTableContext<any>();

function TableProvider<T extends object = object>({
  data,
  children,
}: Props<T>): React.JSX.Element {
  const [dataForTable, setDataForTable] = useState<Data<T[]>>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(null);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [table, setTable] = useState<Table<T>>(null);

  const getSelectedFlatRows = useCallback<TableContextType<T>['getSelectedFlatRows']>(
    () => table?.getSelectedRowModel().flatRows,
    [table]
  );

  const rowSelectionSize = useMemo<TableContextType<T>['rowSelectionSize']>(
    () => Object.keys(rowSelection ?? {}).length,
    [rowSelection]
  );

  const contextValue = useMemo<TableContextType<T>>(
    () => ({
      rowSelection,
      getSelectedFlatRows,
      setTable,
      setRowSelection,
      dataForTable: dataForTable || data,
      setDataForTable,
      rowSelectionSize,
      globalFilter,
      setGlobalFilter,
    }),
    [
      rowSelection,
      getSelectedFlatRows,
      dataForTable,
      data,
      rowSelectionSize,
      globalFilter,
    ]
  );

  return <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>;
}

export default TableProvider;
