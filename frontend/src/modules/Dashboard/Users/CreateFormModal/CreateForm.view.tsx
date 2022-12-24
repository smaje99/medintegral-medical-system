import { useReducer } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MdPersonSearch } from 'react-icons/md';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';

import Button from '@Components/Button';
import { Spinner } from '@Components/loaders';

import type { CreateFormViewProps, UserCreateFormValues } from '../Users.types';

import styles from './CreateFormModal.module.scss';

const CreateFormView = ({
    isPersonLoading,
    isPersonCreated,
    handleCreate,
    handleClose,
    searchPerson,
    roles
}: CreateFormViewProps) => {
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
                <label htmlFor="dni" className={styles.content}>
                    <span className={styles.text} data-obligatory="yes">
                        Identificación
                    </span>
                    <div className={styles.field}>
                        <select
                            className={styles.select}
                            disabled={isPersonCreated}
                            {...register('document_type')}
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
                    </div>
                </label>

                <label htmlFor="name" className={styles.content}>
                    <span className={styles.text} data-obligatory="yes">
                        Nombre
                    </span>
                    <div className={styles.field}>
                        <input
                            type="text"
                            id="name"
                            className={styles.input}
                            disabled={isPersonCreated}
                            required
                            {...register('name')}
                        />
                    </div>
                </label>

                <label htmlFor="surname" className={styles.content}>
                    <span className={styles.text} data-obligatory="yes">
                        Apellido
                    </span>
                    <div className={styles.field}>
                        <input
                            type="text"
                            id="surname"
                            className={styles.input}
                            disabled={isPersonCreated}
                            required
                            {...register('surname')}
                        />
                    </div>
                </label>

                {!isObligatory && <label htmlFor="address" className={styles.content}>
                    <span className={styles.text}>
                        Dirección
                    </span>
                    <div className={styles.field}>
                        <input
                            type="text"
                            id="address"
                            className={styles.input}
                            disabled={isPersonCreated}
                            {...register('address')}
                        />
                    </div>
                </label>}

                <label htmlFor="email" className={styles.content}>
                    <span className={styles.text} data-obligatory="yes">
                        Correo electrónico
                    </span>
                    <div className={styles.field}>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            disabled={isPersonCreated}
                            required
                            {...register('email')}
                        />
                    </div>
                </label>

                <label htmlFor="phone" className={styles.content}>
                    <span className={styles.text} data-obligatory="yes">
                        Celular
                    </span>
                    <div className={styles.field}>
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
                    </div>
                </label>

                <label htmlFor="gender" className={styles.content}>
                    <span className={styles.text} data-obligatory="yes">
                        Genero
                    </span>
                    <div className={styles.field}>
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
                    </div>
                </label>

                <label htmlFor="birthdate" className={styles.content}>
                    <span className={styles.text} data-obligatory="yes">
                        Fecha de Nacimiento
                    </span>
                    <div className={styles.field}>
                        <input
                            type="date"
                            id="birthdate"
                            className={styles.input}
                            disabled={isPersonCreated}
                            required
                            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toLocaleDateString('en-CA')}
                            {...register('birthdate')}
                        />
                    </div>
                </label>

                {!isObligatory && <label htmlFor="blood_type" className={styles.content}>
                    <span className={styles.text}>
                        Grupo sanguíneo
                    </span>
                    <div className={styles.field}>
                        <select
                            id="blood_type"
                            className={styles.input_select}
                            disabled={isPersonCreated}
                            {...register('blood_type')}
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
                    </div>
                </label>}

                {!isObligatory && <label htmlFor="ethnicity" className={styles.content}>
                    <span className={styles.text}>
                        Etnia
                    </span>
                    <div className={styles.field}>
                        <input
                            type="text"
                            id="ethnicity"
                            className={styles.input}
                            disabled={isPersonCreated}
                            {...register('ethnicity')}
                        />
                    </div>
                </label>}

                {!isObligatory && <label htmlFor="civil_status" className={styles.content}>
                    <span className={styles.text}>
                        Estado civil
                    </span>
                    <div className={styles.field}>
                        <select
                            id="civil_status"
                            className={styles.input_select}
                            disabled={isPersonCreated}
                            {...register('civil_status')}
                        >
                            <option value="" key="none">- Seleccione estado civil -</option>
                            <option value="soltero" key="soltero">Soltero</option>
                            <option value="casado" key="casado">Casado</option>
                            <option value="divorciado" key="divorciado">Divorciado</option>
                            <option value="viudo" key="viudo">viudo</option>
                            <option value="unión marital" key="unión marital">Unión marital</option>
                        </select>
                    </div>
                </label>}

                <label htmlFor="role_id" className={styles.content}>
                    <span className={styles.text} data-obligatory="yes">
                        Rol
                    </span>
                    <div className={styles.field}>
                        <select
                            id="role_id"
                            className={styles.input_select}
                            required
                            {...register('role_id')}
                        >
                            <option value="" key="none">- Seleccione rol -</option>
                            {roles?.data && roles.data.map(role => (
                                <option value={role.id} key={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>

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