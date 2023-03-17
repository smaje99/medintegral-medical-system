import { useFormContext } from 'react-hook-form';

import type { TextAreaFieldAttributes } from './Field.dto';

import styles from '../Form.module.scss';

function TextAreaField<T>({ name, ...props }: TextAreaFieldAttributes<T>): JSX.Element {
    const { register } = useFormContext();

    return <textarea
        className={styles['field-textarea']}
        {...props}
        {...register(name)}
        id={name}
    ></textarea>
}

export default TextAreaField;