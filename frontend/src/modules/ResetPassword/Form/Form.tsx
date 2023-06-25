import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import routes from '@/helpers/routes';
import getToastConfig from '@/helpers/toast.config';
import { resetPassword } from '@/services/login.service';
import type { Message } from '@/types/message';

import styles from './Form.module.scss';

type Props = {
  token: string;
};

interface ResetPasswordFormValues {
  newPassword: string;
}

const Form: React.FC<Props> = ({ token }) => {
  const [showPassword, toggleShowPassword] = useReducer(
    (state: boolean) => !state,
    false
  );

  const router = useRouter();
  const { handleSubmit, register, reset } = useForm<ResetPasswordFormValues>();

  const handleResetPassword = async (formData: ResetPasswordFormValues) => {
    if (!token) {
      router.push(routes.home);
      return toast.warning('No hay un usuario asociado', getToastConfig());
    }

    return toast.promise(
      resetPassword(token, formData.newPassword),
      {
        pending: 'Restableciendo su contraseña',
        success: {
          render({ data }) {
            reset();
            router.push(routes.login);
            return data.message;
          },
        },
        error: {
          render({ data }) {
            router.push(routes.home);
            // ! probar
            return (data as Message).message;
          },
        },
      },
      getToastConfig()
    );
  };

  useEffect(() => () => reset(), [reset]);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(handleResetPassword)}
      autoComplete='off'
    >
      <div className={styles.field}>
        <input
          type={showPassword ? 'text' : 'password'}
          id='password'
          className={styles.input}
          placeholder='Nueva contraseña'
          required
          autoComplete='off'
          {...register('newPassword')}
        />
        <div className={styles.show_password} onClick={toggleShowPassword}>
          {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
        </div>
      </div>

      <Button as='input' type='submit' stylesFor='secondary' className={styles.button}>
        Restablecer contraseña
      </Button>
    </form>
  );
};

export default Form;
