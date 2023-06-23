import { useMemo } from 'react';

import { type CommandAttributes, type FieldAttributes, Form } from '@/components/Form';
import type { DoctorUpdate } from '@/types/medical/doctor.model';

type Props = {
  onUpdate: (data: DoctorUpdate) => Promise<void>;
  onClose: () => void;
};

const DoctorDataForm: React.FC<Props> = ({ onUpdate, onClose }) => {
  const data = useMemo<FieldAttributes<DoctorUpdate>[]>(
    () => [
      {
        type: 'text',
        name: 'signature',
        label: 'Firma',
      },
    ],
    []
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Actualizar' },
      reset: { label: 'Cancelar' },
    }),
    []
  );

  return (
    <Form<DoctorUpdate>
      data={data}
      commands={commands}
      onSubmit={onUpdate}
      onReset={onClose}
    />
  );
};

export default DoctorDataForm;
