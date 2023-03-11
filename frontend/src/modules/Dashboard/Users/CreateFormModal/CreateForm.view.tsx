import { useReducer } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MdPersonSearch } from 'react-icons/md';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import MaskedInput from 'react-text-mask';

import { Badge } from '@Components/Badge';
import Button from '@Components/Button';
import { Field } from '@Components/Form';
import { Spinner } from '@Components/loaders';

import type { CreateFormViewProps, UserCreateFormValues } from '../Users.types';

import styles from './CreateFormModal.module.scss';

const CreateFormView: React.FC<CreateFormViewProps> = ({
    isPersonLoading,
    isPersonCreated,
    handleCreate,
    handleClose,
    searchPerson,
    roles
}) => {
    const [isObligatory, handleObligatory] = useReducer((state) => !state, true);
    const { control, handleSubmit, register } = useFormContext<UserCreateFormValues>();

    const handleSearchPerson = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key.toLowerCase() === 's' && searchPerson();
    }

    return (
        <>
            <h1 className={styles.title}>Crear Usuario</h1>

            <label className={styles.obligatory_content}>
                <input
                    type="checkbox"
                    checked={isObligatory}
                    className={styles.obligatory_checkbox}
                    onChange={handleObligatory}
                />
                <span className={styles.obligatory_label}>
                    Campos obligatorios
                </span>
            </label>

            <form onSubmit={handleSubmit(handleCreate)} className={styles.form}>
                <Field htmlFor="dni" title="Identificación" obligatory>
                    <select
                        className={styles.select}
                        disabled={isPersonCreated}
                        {...register('documentType')}
                    >
                        <option value="C.C." key="C.C.">C.C.</option>
                        <option value="C.E." key="C.E.">C.E.</option>
                    </select>
                    <input
                        type="number"
                        id="dni"
                        className={styles.input}
                        autoFocus={true}
                        disabled={isPersonCreated}
                        autoComplete="on"
                        required
                        min={0}
                        onKeyDownCapture={handleSearchPerson}
                        {...register('dni')}
                    />
                    {isPersonLoading ? <Spinner size="s" /> : (
                        <div
                            className={styles.search}
                            title="Buscar persona"
                            onClick={searchPerson}
                        >
                            <MdPersonSearch />
                        </div>
                    )}
                </Field>

                <Field htmlFor="name" title="Nombre" obligatory>
                    <input
                        type="text"
                        id="name"
                        className={styles.input}
                        disabled={isPersonCreated}
                        required
                        {...register('name')}
                    />
                </Field>

                <Field htmlFor="surname" title="Apellido" obligatory>
                    <input
                        type="text"
                        id="surname"
                        className={styles.input}
                        disabled={isPersonCreated}
                        required
                        {...register('surname')}
                    />
                </Field>

                {!isObligatory && <Field htmlFor="address" title="Dirección">
                    <input
                        type="text"
                        id="address"
                        className={styles.input}
                        disabled={isPersonCreated}
                        {...register('address')}
                    />
                </Field>}

                <Field htmlFor="email" title="Correo electrónico" obligatory>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        disabled={isPersonCreated}
                        required
                        {...register('email')}
                    />
                </Field>

                <Field htmlFor="phone" title="Celular" obligatory>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <PhoneInput
                                value={field.value}
                                containerClass={styles.phone}
                                inputClass={styles.phone_input}
                                buttonClass={styles.phone_button}
                                dropdownClass={styles.phone_dropdown}
                                country="co"
                                preferredCountries={['co']}
                                localization={es}
                                enableSearch
                                searchPlaceholder="buscar"
                                searchNotFound="No hay coincidencias"
                                inputProps={{
                                    id: 'phone',
                                    disabled: isPersonCreated,
                                    required: true,
                                    ...register('phone')
                                }}
                            />
                        )}
                        rules={{ required: true }}
                    />
                </Field>

                <Field htmlFor="gender" title="Genero" obligatory>
                    <select
                        id="gender"
                        className={styles.input_select}
                        disabled={isPersonCreated}
                        required
                        {...register('gender')}
                    >
                        <option value="" key="none">- Seleccione un genero -</option>
                        <option value="masculino" key="masculino">Masculino</option>
                        <option value="femenino" key="femenino">Femenino</option>
                    </select>
                </Field>

                <Field htmlFor="birthdate" title="Fecha de Nacimiento" obligatory>
                    <input
                        type="date"
                        id="birthdate"
                        className={styles.input}
                        disabled={isPersonCreated}
                        required
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toLocaleDateString('en-CA')}
                        {...register('birthdate')}
                    />
                </Field>

                {!isObligatory && <Field htmlFor="blood_type" title="Grupo sanguíneo">
                    <select
                        id="blood_type"
                        className={styles.input_select}
                        disabled={isPersonCreated}
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
                </Field>}

                {!isObligatory && <Field htmlFor="ethnicity" title="Etnia">
                    <input
                        type="text"
                        id="ethnicity"
                        className={styles.input}
                        disabled={isPersonCreated}
                        {...register('ethnicity')}
                    />
                </Field>}

                {!isObligatory && <Field htmlFor="civil_status" title="Estado civil">
                    <select
                        id="civil_status"
                        className={styles.input_select}
                        disabled={isPersonCreated}
                        {...register('civilStatus')}
                    >
                        <option value="" key="none">- Seleccione estado civil -</option>
                        <option value="soltero" key="soltero">Soltero</option>
                        <option value="casado" key="casado">Casado</option>
                        <option value="divorciado" key="divorciado">Divorciado</option>
                        <option value="viudo" key="viudo">viudo</option>
                        <option value="unión marital" key="unión marital">Unión marital</option>
                    </select>
                </Field>}

                <Field htmlFor="role_id" title="Rol" obligatory>
                    <select
                        id="role_id"
                        className={styles.input_select}
                        required
                        {...register('roleId')}
                    >
                        <option value="" key="none">- Seleccione rol -</option>
                        {roles?.data?.map(role => (
                            <option value={role.id} key={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </Field>

                <div className={styles.commands}>
                    <Button
                        as="input"
                        type="reset"
                        stylesFor="secondary"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        as="input"
                        type="submit"
                        stylesFor="primary"
                        disabled={!!roles?.error}
                    >
                        Crear
                    </Button>
                </div>
            </form>
        </>
    )
}

export default CreateFormView;