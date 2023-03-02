import { useFormContext } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import { Badge } from '@Components/Badge';
import Button from '@Components/Button';
import { Field } from '@Components/Form';

import type { DoctorDataFormProps, DoctorDataUpdateValues } from '../User.types';

import styles from './UserUpdateModal.module.scss';

const DoctorDataForm: React.FC<DoctorDataFormProps> = ({
    onUpdate,
    onClose,
    medicalLicenses,
    handleAddMedicalLicense,
    handleRemoveMedicalLicense
}) => {
    const { handleSubmit, register } = useFormContext<DoctorDataUpdateValues>();

    return (
        <form onSubmit={handleSubmit(onUpdate)} className={styles['form']}>
            <Field
                htmlFor='medicalLicenses'
                title='Registro médico'
                legend='Añadir una coma después de cada registro'
            >
                <ul className={styles.box} role="listbox">
                    {medicalLicenses.map((license, idx) => (
                        <li key={`license-update-${license}-${idx}`}>
                            <Badge
                                color='green-blue'
                                onClose={handleRemoveMedicalLicense}
                                className={styles.badge}
                                titleClose='Remover registro'
                            >
                                {license}
                            </Badge>
                        </li>
                    ))}
                    <MaskedInput
                        mask={['R', 'M', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                        guide={true}
                        showMask={true}
                        placeholderChar={'\u2000'}
                        type='text'
                        id='medicalLicenses'
                        className={styles.input}
                        onKeyDownCapture={handleAddMedicalLicense}
                    />
                </ul>
            </Field>

            <Field htmlFor="signature" title="Firma">
                <input
                    type="text"
                    id="signature"
                    className={styles['input']}
                    {...register('signature')}
                />
            </Field>

            <div className={styles['commands']}>
                <Button
                    as="input"
                    type="reset"
                    stylesFor="secondary"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    as="input"
                    type="submit"
                    stylesFor="primary"
                >
                    Actualizar
                </Button>
            </div>
        </form>
    )
}

export default DoctorDataForm;