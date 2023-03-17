import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
    Form, InputField, type FieldAttributes, type CommandAttributes
} from '@Components/Form';

import { PersonalDataUpdateProps, PersonalDataUpdateValues } from '../User.types';

import styles from './UserUpdateModal.module.scss';

const PersonalDataForm: React.FC<PersonalDataUpdateProps> = ({
    onUpdate, onClose
}) => {
    const { register } = useFormContext<PersonalDataUpdateValues>();

    const data = useMemo<FieldAttributes<PersonalDataUpdateValues>[]>(() => [
        {
            type: 'custom',
            name: 'dni',
            label: 'Identificación',
            render: () => (
                <>
                    <select
                        className={styles['select']}
                        disabled={true}
                        {...register('documentType')}
                    >
                        <option value="C.C.">C.C.</option>
                        <option value="C.E.">C.E.</option>
                    </select>
                    <InputField
                        type='number'
                        name='dni'
                        label='Identificación'
                        disabled={true}
                        min={0}
                    />
                </>
            )
        },
        {
            type: 'text',
            name: 'name',
            label: 'Nombre'
        },
        {
            type: 'text',
            name: 'surname',
            label: 'Apellido'
        },
        {
            type: 'text',
            name: 'address',
            label: 'Dirección'
        },
        {
            type: 'email',
            name: 'email',
            label: 'Correo electrónico'
        },
        {
            type: 'phone',
            name: 'phone',
            label: 'Celular',
        },
        {
            type: 'select',
            name: 'gender',
            label: 'Genero',
            options: [
                { label: '- Seleccione genero -', value: '' },
                { label: 'Masculino', value: 'masculino' },
                { label: 'Femenino', value: 'femenino' }
            ]
        },
        {
            type: 'select',
            name: 'bloodType',
            label: 'Grupo sanguíneo',
            options: [
                { label: '- Seleccione G.S. -', value: '' },
                { label: 'A+', value: 'A+' },
                { label: 'A-', value: 'A-' },
                { label: 'B+', value: 'B+' },
                { label: 'B-', value: 'B-' },
                { label: 'AB+', value: 'AB+' },
                { label: 'AB-', value: 'AB-' },
                { label: 'O+', value: 'O+' },
                { label: 'O-', value: 'O-' },
            ]
        },
        {
            type: 'text',
            name: 'ethnicity',
            label: 'Etnia'
        },
        {
            type: 'select',
            name: 'civilStatus',
            label: 'Estado civil',
            options: [
                { label: '- Seleccione estado civil -', value: '' },
                { label: 'Soltero', value: 'soltero' },
                { label: 'Casado', value: 'casado' },
                { label: 'Divorciado', value: 'divorciado' },
                { label: 'Viudo', value: 'viudo' },
                { label: 'Unión marital', value: 'unión marital' }
            ]
        },
        {
            type: 'date',
            name: 'birthdate',
            label: 'Fecha de nacimiento',
            max: new Date().setFullYear(new Date().getFullYear() - 18)
        },
        {
            type: 'textarea',
            name: 'occupation',
            label: 'Ocupación',
            spellCheck: true,
            maxLength: 150
        }
    ], []);

    const commands = useMemo<CommandAttributes>(() => ({
        submit: { label: 'Actualizar' },
        reset: { label: 'Cancelar' }
    }), []);

    return (
        <Form<PersonalDataUpdateValues>
            data={data}
            commands={commands}
            onSubmit={onUpdate}
            onReset={onClose}
        />
    )
}

export default PersonalDataForm;