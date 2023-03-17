import { useFormContext } from 'react-hook-form';

import type { InputFieldAttributes } from './Field.dto';

import styles from '../Form.module.scss';

function InputField<T>({ name, type, ...props }: InputFieldAttributes<T>): JSX.Element {
    const { register } = useFormContext();

    return <input
        className={styles['field-input']}
        {...props}
        {...register(name)}
        id={name}
        type={type}
    />
}

export default InputField;