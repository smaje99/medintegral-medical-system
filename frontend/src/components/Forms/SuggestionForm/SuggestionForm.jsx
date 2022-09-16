import { useForm } from 'react-hook-form';

import Button from '@Components/Button';

import styles from './SuggestionForm.module.scss';

const SuggestionForm = () => {
    const { register, handleSubmit } = useForm();

    const handleFormSubmit = async (formData) => {}

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <textarea
                spellCheck
                placeholder="Escribe aquí tus opiniones"
                maxLength="500"
                required
                className={styles.textarea}
                {...register('rating')}
            >
            </textarea>
            <div className={styles.commands}>
                <Button type="reset" style="secondary" as="input" className={styles.button}>
                    Cancelar
                </Button>
                <Button type="submit" style="primary" as="input" className={styles.button}>
                    Enviar
                </Button>
            </div>
        </form>
    )
}

export default SuggestionForm;