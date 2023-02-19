import { ColumnDef, Row, RowSelectionState, Table } from '@tanstack/react-table';

export interface TableProps<D extends object = {}> {
    columns : ColumnDef<D>[];
    data: D[];
}

export interface TableContextType<T> {
    rowSelection: RowSelectionState;
    getSelectedFlatRows: () => Row<T>[];
    setTable: React.Dispatch<React.SetStateAction<Table<T>>>
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>
}