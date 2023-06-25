import type { Column, Table } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DebouncedInput } from '@/components/Input';

import styles from './Filter.module.scss';

export interface Props<T extends object> {
  column: Column<T, unknown>;
  table: Table<T>;
}

function Filter<T extends object>({ column, table }: Props<T>) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort((a, b) => a - b),
    [column, firstValue]
  );

  if (typeof firstValue === 'number') {
    return (
      <div>
        <div className={styles.filter}>
          <DebouncedInput
            type='number'
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className={`${styles['filter-input']} ${styles.small}`}
          />
          <DebouncedInput
            type='number'
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className={`${styles['filter-input']} ${styles.small}`}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <datalist id={`${column.id}-list`}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type='search'
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
        className={`${styles['filter-input']} ${styles.large}`}
        list={`${column.id}-list`}
      />
    </>
  );
}

export default Filter;
