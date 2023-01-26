import { UseFiltersColumnProps } from 'react-table';
import { Column, ColumnDef, Table } from '@tanstack/react-table';

export interface TableProps<D extends object = {}> {
    columns : ColumnDef<D>[];
    data: D[];
}

export interface DefaultColumnFilterProps<D extends object = {}> {
    column: UseFiltersColumnProps<D> & { id: string };
}

export interface FilterProps {
    column: Column<any, any>;
    table: Table<any>;
}