import { ColumnDef } from '@tanstack/react-table';

import { IndeterminateCheckbox } from '@Components/Input';

export default function SelectionColumn<T extends object = {}>(): ColumnDef<T> {
    return {
        id: 'select',
        header: ({ table }) => (
            <IndeterminateCheckbox {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllPageRowsSelectedHandler()
            }} />
        ),
        cell: ({ row }) => (
            <div>
                <IndeterminateCheckbox {...{
                    checked: row.getIsSelected(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler()
                }} />
            </div>
        )
    }
}