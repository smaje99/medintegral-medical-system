import { useMemo } from 'react';

import { type CommandAttributes, type FieldAttributes, Form } from '@/components/Form';
import type { UserPasswordUpdate } from '@/types/user/user';

type Props = {
  onUpdate: (data: UserPasswordUpdate) => Promise<void>;
  onClose: () => void;
};

const ChangePasswordForm: React.FC<Props> = ({ onUpdate, onClose }) => {
  const data = useMemo<FieldAttributes<UserPasswordUpdate>[]>(
    () => [
      {
        type: 'password',
        name: 'oldPassword',
        label: 'Contraseña actual',
        required: true,
      },
      {
        type: 'password',
        name: 'newPassword',
        label: 'Contraseña nueva',
        required: true,
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
    <Form<UserPasswordUpdate>
      data={data}
      commands={commands}
      onSubmit={onUpdate}
      onReset={onClose}
      autoComplete='off'
    />
  );
};

export default ChangePasswordForm;
