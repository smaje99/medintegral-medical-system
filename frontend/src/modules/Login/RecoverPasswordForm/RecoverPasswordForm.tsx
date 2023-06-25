import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import getToastConfig from '@/helpers/toast.config';
import { passwordRecovery } from '@/services/login.service';
import { Message } from '@/types/message';

import styles from './RecoverPasswordForm.module.scss';

interface RecoverPasswordFormValues {
  readonly email: string;
}

const RecoverPasswordForm = forwardRef(function RecoverPasswordFormComponent(props, ref) {
  const { handleSubmit, register, reset } = useForm<RecoverPasswordFormValues>();

  const handleRecoverPassword = async (formData: RecoverPasswordFormValues) => {
    await toast.promise(
      passwordRecovery(formData.email),
      {
        pending: 'Enviando correo electrónico',
        success: {
          render({ data }) {
            reset();
            return data.message;
          },
        },
        error: {
          render({ data }) {
            // ! Probar
            return (data as Message).message;
          },
        },
      },
      getToastConfig()
    );
  };

  /* A cleanup function that is called when the form is unmounted. */
  useEffect(() => () => reset(), [reset]);

  useImperativeHandle(ref, () => ({ reset }), [reset]);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(handleRecoverPassword)}
      autoComplete='on'
    >
      <input
        type='email'
        id='email'
        className={styles.input}
        placeholder='Correo electrónico'
        required
        {...register('email')}
      />

      <Button type='submit' as='input' stylesFor='secondary' className={styles.button}>
        Enviar
      </Button>
    </form>
  );
});

export default RecoverPasswordForm;
