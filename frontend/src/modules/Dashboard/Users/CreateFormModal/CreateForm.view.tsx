import { type KeyboardEventHandler, useCallback, useMemo, useReducer } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdPersonSearch } from 'react-icons/md';

import {
  type CommandAttributes,
  type FieldAttributes,
  Form,
  InputField,
} from '@/components/Form';
import { Spinner } from '@/components/loaders';
import type { Data } from '@/types/data-request';
import type { Role } from '@/types/user/role';

import { UserCreateFormValues } from './CreateFormModal';
import styles from './CreateFormModal.module.scss';

type Props = {
  isPersonLoading: boolean;
  isPersonCreated: boolean;
  handleCreate: (formData: UserCreateFormValues) => Promise<void>;
  handleClose: () => void;
  searchPerson: () => Promise<void>;
  roles: Data<Role[]>;
};

const CreateFormView: React.FC<Props> = ({
  isPersonLoading,
  isPersonCreated,
  handleCreate,
  handleClose,
  searchPerson,
  roles,
}) => {
  const [isObligatory, handleObligatory] = useReducer((state) => !state, true);
  const { register } = useFormContext<UserCreateFormValues>();

  const handleSearchPerson: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key.toLowerCase() === 's') {
        searchPerson();
      }
    },
    [searchPerson]
  );

  const data = useMemo<FieldAttributes<UserCreateFormValues>[]>(
    () =>
      [
        {
          type: 'custom',
          name: 'dni',
          label: 'Identificación',
          obligatory: true,
          render: () => (
            <>
              <select
                className={styles.select}
                disabled={isPersonCreated}
                {...register('documentType')}
              >
                <option value='C.C.'>C.C.</option>
                <option value='C.E.'>C.E.</option>
              </select>
              <InputField
                type='number'
                name='dni'
                label=''
                autoFocus={true}
                disabled={isPersonCreated}
                autoComplete='on'
                required
                min={0}
                onKeyDownCapture={handleSearchPerson}
              />
              {isPersonLoading ? (
                <Spinner size='s' />
              ) : (
                <div
                  className={styles.search}
                  title='Buscar persona'
                  onClick={searchPerson}
                >
                  <MdPersonSearch />
                </div>
              )}
            </>
          ),
        },
        {
          type: 'text',
          name: 'name',
          label: 'Nombre',
          obligatory: true,
          disabled: isPersonCreated,
        },
        {
          type: 'text',
          name: 'surname',
          label: 'Apellido',
          obligatory: true,
          disabled: isPersonCreated,
        },
        !isObligatory && {
          type: 'text',
          name: 'address',
          label: 'Dirección',
          disabled: isPersonCreated,
        },
        {
          type: 'email',
          name: 'email',
          label: 'Correo electrónico',
          obligatory: true,
          disabled: isPersonCreated,
        },
        {
          type: 'phone',
          name: 'phone',
          label: 'Celular',
          obligatory: true,
          disabled: isPersonCreated,
        },
        {
          type: 'select',
          name: 'gender',
          label: 'Genero',
          options: [
            { label: '- Seleccione genero -', value: '' },
            { label: 'Masculino', value: 'masculino' },
            { label: 'Femenino', value: 'femenino' },
          ],
          obligatory: true,
          disabled: isPersonCreated,
        },
        {
          type: 'date',
          name: 'birthdate',
          label: 'Fecha de nacimiento',
          max: new Date().setFullYear(new Date().getFullYear() - 18),
          obligatory: true,
          disabled: isPersonCreated,
        },
        !isObligatory && {
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
          ],
          disable: isPersonCreated,
        },
        !isObligatory && {
          type: 'text',
          name: 'ethnicity',
          label: 'Etnia',
          disabled: isPersonCreated,
        },
        !isObligatory && {
          type: 'select',
          name: 'civilStatus',
          label: 'Estado civil',
          options: [
            { label: '- Seleccione estado civil -', value: '' },
            { label: 'Soltero', value: 'soltero' },
            { label: 'Casado', value: 'casado' },
            { label: 'Divorciado', value: 'divorciado' },
            { label: 'Viudo', value: 'viudo' },
            { label: 'Unión marital', value: 'unión marital' },
          ],
          disable: isPersonCreated,
        },
        {
          type: 'select',
          name: 'roleId',
          label: 'Rol',
          obligatory: true,
          options: [
            { label: '- Seleccione rol -', value: '' },
            ...roles.data.map((role) => ({
              label: role.name,
              value: role.id,
            })),
          ],
        },
      ].filter(Boolean) as FieldAttributes<UserCreateFormValues>[],
    [
      handleSearchPerson,
      isObligatory,
      isPersonCreated,
      isPersonLoading,
      register,
      roles?.data,
      searchPerson,
    ]
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Crear', disabled: !!roles?.error },
      reset: { label: 'Cancelar' },
    }),
    [roles?.error]
  );

  return (
    <>
      <h1 className={styles.title}>Crear Usuario</h1>

      <label className={styles['obligatory-content']}>
        <input
          type='checkbox'
          checked={isObligatory}
          className={styles['obligatory-checkbox']}
          onChange={handleObligatory}
        />
        <span className={styles['obligatory-label']}>Campos obligatorios</span>
      </label>

      <Form<UserCreateFormValues>
        data={data}
        commands={commands}
        onSubmit={handleCreate}
        onReset={handleClose}
      />
    </>
  );
};

export default CreateFormView;
