import { useFormContext } from 'react-hook-form';

import { PersonalDataUpdateProps, PersonalDataUpdateValues } from '../User.types';

import styles from './UserUpdateModal.module.scss';

const PersonalDataForm: React.FC<PersonalDataUpdateProps> = ({ onUpdate }) => {
    const { handleSubmit } = useFormContext<PersonalDataUpdateValues>();

    return (
        <form onSubmit={handleSubmit(onUpdate)} className={styles['form']}>

        </form>
    )
}

export default PersonalDataForm;