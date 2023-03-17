import { useReducer } from 'react';
import { useFormContext } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import { PasswordFieldAttributes } from './Field.dto';

import styles from '../Form.module.scss';

function PasswordField<T>({ name, ...props }: PasswordFieldAttributes<T>): JSX.Element {
    const [
        showPassword, handleShowPassword
    ] = useReducer((state: boolean) => !state, false);

    const { register } = useFormContext<T>();

    return (
        <>
            <input
                className={styles['field-input']}
                {...props}
                {...register(name)}
                type={showPassword ? 'text' : 'password'}
                id={name}
            />
            <div
                onClick={handleShowPassword}
                className={styles['show-password']}
            >
                {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
            </div>
        </>
    )
}

export default PasswordField;