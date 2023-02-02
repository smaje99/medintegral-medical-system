import { useMemo } from 'react';

import { DefaultColumnFilterProps } from "../Table.types";

import styles from '../Table.module.scss';

function SelectColumnFilter<D extends object = {}>({
    column: { filterValue, setFilter, preFilteredRows, id }
}: DefaultColumnFilterProps<D>) {
    const options = useMemo(() => {
        const options = new Set<string>();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id])
        });

        return [...options.values()]
    }, [id, preFilteredRows]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value || undefined);
    }

    return (
        <select
            value={filterValue}
            className={styles.input}
            onChange={handleSelectChange}
        >
            <option value="">Todos</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default SelectColumnFilter;