import { Controller, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';

import Button from '@Components/Button';
import { Field } from '@Components/Form';

import { PersonalDataUpdateProps, PersonalDataUpdateValues } from '../User.types';

import styles from './UserUpdateModal.module.scss';

const PersonalDataForm: React.FC<PersonalDataUpdateProps> = ({
    onUpdate, onClose
}) => {
    const { handleSubmit, register, control } = useFormContext<PersonalDataUpdateValues>();

    return (
        <form onSubmit={handleSubmit(onUpdate)} className={styles['form']}>
            <Field htmlFor="dni" title="Identificación">
                <select
                    className={styles['select']}
                    disabled={true}
                    {...register('documentType')}
                >
                    <option value="C.C." key="C.C.">C.C.</option>
                    <option value="C.E." key="C.E.">C.E.</option>
                </select>
                <input
                    type="number"
                    id="dni"
                    className={styles['input']}
                    disabled={true}
                    min={0}
                    {...register('dni')}
                />
            </Field>

            <Field htmlFor="name" title="Nombre">
                <input
                    type="text"
                    id="name"
                    className={styles['input']}
                    {...register('name')}
                />
            </Field>

            <Field htmlFor="surname" title="Apellido">
                <input
                    type="text"
                    id="surname"
                    className={styles['input']}
                    {...register('surname')}
                />
            </Field>

            <Field htmlFor="address" title="Dirección">
                <input
                    type="text"
                    id="address"
                    className={styles['input']}
                    {...register('address')}
                />
            </Field>

            <Field htmlFor="email" title="Correo electrónico">
                <input
                    type="email"
                    id="email"
                    className={styles['input']}
                    {...register('email')}
                />
            </Field>

            <Field htmlFor="phone" title="Celular">
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <PhoneInput
                            value={field.value}
                            containerClass={styles['phone']}
                            inputClass={styles['phone-input']}
                            buttonClass={styles['phone-button']}
                            dropdownClass={styles['phone-dropdown']}
                            country="co"
                            preferredCountries={['co']}
                            localization={es}
                            enableSearch
                            searchPlaceholder="buscar"
                            searchNotFound="No hay coincidencias"
                            inputProps={{
                                id: 'phone',
                                ...register('phone')
                            }}
                        />
                    )}
                />
            </Field>

            <Field htmlFor="gender" title="Genero">
                <select
                    id="gender"
                    className={styles['input-select']}
                    {...register('gender')}
                >
                    <option value="" key="none">- Seleccione un genero -</option>
                    <option value="masculino" key="masculino">Masculino</option>
                    <option value="femenino" key="femenino">Femenino</option>
                </select>
            </Field>

            <Field htmlFor="bloodType" title="Grupo sanguíneo">
                <select
                    id="bloodType"
                    className={styles['input-select']}
                    {...register('bloodType')}
                >
                    <option value="" key="none">- Seleccione G.S. -</option>
                    <option value="A+" key="A+">A+</option>
                    <option value="A-" key="A-">A-</option>
                    <option value="B+" key="B+">B+</option>
                    <option value="B-" key="B-">B-</option>
                    <option value="AB+" key="AB+">AB+</option>
                    <option value="AB-" key="AB-">AB-</option>
                    <option value="O+" key="O+">O+</option>
                    <option value="O-" key="O-">O-</option>
                </select>
            </Field>

            <Field htmlFor="ethnicity" title="Etnia">
                <input
                    type="text"
                    id="ethnicity"
                    className={styles['input']}
                    {...register('ethnicity')}
                />
            </Field>

            <Field htmlFor="civilStatus" title="Estado civil">
                <select
                    id="civilStatus"
                    className={styles['input-select']}
                    {...register('civilStatus')}
                >
                    <option value="" key="none">- Seleccione estado civil -</option>
                    <option value="soltero" key="soltero">Soltero</option>
                    <option value="casado" key="casado">Casado</option>
                    <option value="divorciado" key="divorciado">Divorciado</option>
                    <option value="viudo" key="viudo">viudo</option>
                    <option value="unión marital" key="unión marital">Unión marital</option>
                </select>
            </Field>

            <Field htmlFor="birthdate" title="Fecha de Nacimiento">
                <input
                    type="date"
                    id="birthdate"
                    className={styles['input']}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toLocaleDateString('en-CA')}
                    {...register('birthdate')}
                />
            </Field>

            <Field htmlFor="occupation" title="Ocupación">
                <textarea
                    id="occupation"
                    className={styles['textarea']}
                    maxLength={150}
                    spellCheck={true}
                    {...register('occupation')}
                ></textarea>
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

export default PersonalDataForm;