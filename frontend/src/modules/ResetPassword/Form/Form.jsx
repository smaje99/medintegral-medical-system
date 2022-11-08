import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { toast } from 'react-toastify'

import Button from '@Components/Button';
import routes from '@Helpers/routes';
import getToastConfig from '@Helpers/toast.config';
import { resetPassword } from '@Services/login.service';

import styles from './Form.module.scss';

const Form = ({ token }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, register, reset } = useForm();

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword((current) => !current);
    }

    const handleResetPassword = async (formData) => {
        if (!token) {
            router.push(routes.home);
            return toast.warning('No hay un usuario asociado', getToastConfig());
        }

        await toast.promise(
            resetPassword({ token, ...formData }),
            {
                pending: 'Restableciendo si contraseña',
                success: {
                    render({ data }) {
                        reset();
                        router.push(routes.login);
                        return data.data.message;
                    }
                },
                error: {
                    render({ data }) {
                        router.push(routes.home);
                        return data.response.data.detail
                    }
                }
            },
            getToastConfig()
        );
    }

    useEffect(() => () => reset(), []);

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleResetPassword)}
            autoComplete="off"
        >
            <div className={styles.field}>
                <input
                    type={showPassword ? 'text': 'password'}
                    id="password"
                    className={styles.input}
                    placeholder="Nueva contraseña"
                    required
                    autoComplete="off"
                    {...register('new_password')}
                />
                <div
                    className={styles.show_password}
                    onClick={handleShowPassword}
                >
                    {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
            </div>

            <Button
                type="submit"
                as="input"
                style="secondary"
                className={styles.button}
            >
                Restablecer contraseña
            </Button>
        </form>
    )
}

export default Form;