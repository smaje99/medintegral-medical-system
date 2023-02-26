import type { Data } from '@Types/data-request';
import type {
    ColumnDef, Row, RowSelectionState, Table
} from '@tanstack/react-table';

export interface TableProps<D extends object = {}> {
    columns : ColumnDef<D>[];
}

export interface TableContextType<T> {
    rowSelection: RowSelectionState;
    getSelectedFlatRows: () => Row<T>[];
    setTable: React.Dispatch<React.SetStateAction<Table<T>>>;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
    dataForTable: Data<T[]>;
    setDataForTable: React.Dispatch<React.SetStateAction<Data<T[]>>>;
}

export type TableProviderProps<D extends object = {}> = {
    data: Data<D[]>;
    children: React.ReactNode;
}