import { useMemo } from 'react';

import {
    Form, type FieldAttributes, type CommandAttributes
} from '@Components/Form';

import type { ChangePasswordProps, ChangePasswordValues } from '../User.types';

import styles from './UserUpdateModal.module.scss';

const ChangePasswordForm: React.FC<ChangePasswordProps> = ({ onUpdate, onClose }) => {
    const data = useMemo<FieldAttributes<ChangePasswordValues>[]>(() => [
        {
            type: 'password',
            name: 'oldPassword',
            label: 'Contraseña actual',
            required: true
        },
        {
            type: 'password',
            name: 'newPassword',
            label: 'Contraseña nueva',
            required: true
        }
    ], []);

    const commands = useMemo<CommandAttributes>(() => ({
        submit: { label: 'Actualizar' },
        reset: { label: 'Cancelar' }
    }), []);

    return (
        <Form<ChangePasswordValues>
            data={data}
            commands={commands}
            onSubmit={onUpdate}
            onReset={onClose}
            autoComplete='off'
        />
    )
}

export default ChangePasswordForm;