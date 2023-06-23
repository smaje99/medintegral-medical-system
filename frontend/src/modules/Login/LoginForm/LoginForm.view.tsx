import { useFormContext } from 'react-hook-form';

import Button from '@/components/Button';
import { InputField, PasswordField } from '@/components/Form';
import { Spinner } from '@/components/loaders';

import { type LoginFormValues } from './LoginForm';
import styles from './LoginForm.module.scss';

type Props = {
  readonly handleLogin: (formData: LoginFormValues) => Promise<void>;
};

const LoginFormView: React.FC<Props> = ({ handleLogin }) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useFormContext<LoginFormValues>();

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleLogin)} autoComplete='on'>
      <div className={styles.field}>
        <InputField
          type='text'
          name='username'
          label=''
          placeholder='Usuario'
          autoFocus={true}
          required
          autoComplete='username'
        />
      </div>
      <div className={styles.field}>
        <PasswordField
          type='password'
          name='password'
          label=''
          placeholder='Contraseña'
          required
          autoComplete='current-password'
        />
      </div>
      <label htmlFor='remember-me' className={styles.container}>
        <input
          type='checkbox'
          id='remember-me'
          className={styles.checkbox}
          {...register('rememberMe', { setValueAs: (v) => !!v })}
        />
        <span className={styles.text}>Mantener la sesión iniciada</span>
      </label>

      {isSubmitting ? (
        <Spinner />
      ) : (
        <Button as='input' type='submit' stylesFor='primary' className={styles.button}>
          Iniciar sesión
        </Button>
      )}
    </form>
  );
};

export default LoginFormView;
