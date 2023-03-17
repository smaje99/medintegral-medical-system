import { useFormContext } from 'react-hook-form';

import { SelectFieldAttributes } from './Field.dto';

import styles from '../Form.module.scss';

function SelectField<T>({ name, options, ...props }: SelectFieldAttributes<T>): JSX.Element {
    const { register } = useFormContext();

    return (
        <select
            className={styles['field-select']}
            {...props}
            {...register(name)}
            id={name}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default SelectField;