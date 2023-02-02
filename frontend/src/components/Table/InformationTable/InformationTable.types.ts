import type { ColumnDef } from '@tanstack/react-table';

export interface InformationTableProps<D extends object = {}> {
    columns: ColumnDef<D>[];
    data: D[]
}