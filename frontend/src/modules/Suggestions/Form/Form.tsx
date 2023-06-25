import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import getToastConfig from '@/helpers/toast.config';
import { createSuggestion } from '@/services/suggestion.service';
import type { SuggestionCreate } from '@/types/suggestion';

import styles from './Form.module.scss';

const Form = () => {
  const { register, reset, handleSubmit } = useForm<SuggestionCreate>();

  const handleFormSubmit = async (formData: SuggestionCreate) => {
    await toast.promise(
      createSuggestion(formData),
      {
        pending: 'Procesando la sugerencia',
        success: {
          render() {
            reset();
            return 'La sugerencia fue enviada';
          },
        },
        error: 'La sugerencia no puedo crearse',
      },
      getToastConfig()
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <textarea
        className={styles.textarea}
        placeholder='Escribe aquí tus opiniones'
        autoFocus={true}
        required
        maxLength={500}
        spellCheck={true}
        {...register('opinion')}
      ></textarea>
      <div className={styles.commands}>
        <Button as='input' type='reset' stylesFor='secondary' className={styles.button}>
          Cancelar
        </Button>
        <Button as='input' type='submit' stylesFor='primary' className={styles.button}>
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default Form;
