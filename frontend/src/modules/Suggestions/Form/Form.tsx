import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@Components/Button';
import { createSuggestion } from '@Services/suggestion.service';

import getToastConfig from '@Helpers/toast.config';

import { SuggestionFormValues } from '../Suggestion.types';

import styles from './Form.module.scss';

const Form = () => {
    const { register, reset, handleSubmit } = useForm<SuggestionFormValues>();

    const handleFormSubmit = async (formData: SuggestionFormValues) => {
        await toast.promise(
            createSuggestion(formData),
            {
                pending: 'Procesando la sugerencia',
                success: {
                    render() {
                        reset();
                        return 'La sugerencia fue enviada';
                    }
                },
                error: 'La sugerencia no puedo crearse'
            },
            getToastConfig()
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <textarea
                className={styles.textarea}
                placeholder="Escribe aquí tus opiniones"
                autoFocus={true}
                required
                maxLength={500}
                spellCheck={true}
                {...register('opinion')}
            >
            </textarea>
            <div className={styles.commands}>
                <Button
                    as="input"
                    type="reset"
                    stylesFor="secondary"
                    className={styles.button}
                >
                    Cancelar
                </Button>
                <Button
                    as="input"
                    type="submit"
                    stylesFor="primary"
                    className={styles.button}
                >
                    Enviar
                </Button>
            </div>
        </form>
    )
}

export default Form;