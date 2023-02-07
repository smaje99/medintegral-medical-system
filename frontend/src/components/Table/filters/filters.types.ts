import { Column, Table } from '@tanstack/react-table';

export interface FilterProps {
    column: Column<any, any>;
    table: Table<any>;
}