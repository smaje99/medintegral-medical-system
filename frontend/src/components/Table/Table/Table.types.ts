import { ColumnDef } from '@tanstack/react-table';

export interface TableProps<D extends object = {}> {
    columns : ColumnDef<D>[];
    data: D[];
}