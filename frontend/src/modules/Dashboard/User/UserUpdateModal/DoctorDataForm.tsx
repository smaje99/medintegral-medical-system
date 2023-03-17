import { useMemo } from 'react';

import type { DoctorDataFormProps, DoctorDataUpdateValues } from '../User.types';

import { type CommandAttributes, type FieldAttributes, Form } from '@Components/Form';

const DoctorDataForm: React.FC<DoctorDataFormProps> = ({
    onUpdate,
    onClose
}) => {
    const data = useMemo<FieldAttributes<DoctorDataUpdateValues>[]>(() => [{
        type: 'text',
        name: 'signature',
        label: 'Firma'
    }], []);

    const commands = useMemo<CommandAttributes>(() => ({
        submit: { label: 'Actualizar' },
        reset: { label: 'Cancelar' }
    }), []);

    return (
        <Form<DoctorDataUpdateValues>
            data={data}
            commands={commands}
            onSubmit={onUpdate}
            onReset={onClose}
        />
    )
}

export default DoctorDataForm;