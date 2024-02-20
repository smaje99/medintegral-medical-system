'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { type FieldAttributes, FormUI } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SheetFooter } from '@/components/ui/sheet';
import {
  BloodType,
  CivilStatus,
  DocumentType,
  Gender,
  RhFactor,
} from '@/modules/person/domain/enum';
import { getLegalAge } from '@/modules/person/domain/objects/personBirthdate';
import { RoleAttributes } from '@/modules/user/role/domain';
import {
  personAssociatedWithUserSaveSchema,
  type PersonAssociatedWithUserSaveValues,
} from '@/modules/user/user/domain';

type Props = {
  readonly roles: RoleAttributes[];
  readonly setOpenSheet: (isOpen: boolean) => void;
};

export const CreateUserForm: React.FC<Props> = ({ roles, setOpenSheet }) => {
  const form = useForm<PersonAssociatedWithUserSaveValues>({
    resolver: zodResolver(personAssociatedWithUserSaveSchema),
  });

  const fields = useMemo<FieldAttributes<PersonAssociatedWithUserSaveValues>[]>(
    () => [
      {
        type: 'select',
        name: 'documentType',
        label: 'Documento de identidad',
        placeholder: 'Selecciona el documento de la persona',
        value: DocumentType.CITIZENSHIP_CARD,
        options: [
          { value: DocumentType.CITIZENSHIP_CARD, label: 'Cédula de ciudadanía' },
          { value: DocumentType.IDENTITY_CARD, label: 'Tarjeta de identidad' },
          { value: DocumentType.CIVIL_REGISTRATION, label: 'Registro civil' },
          { value: DocumentType.FOREIGN_ID, label: 'Cédula de extranjería' },
        ],
      },
      {
        type: 'number',
        name: 'dni',
        label: 'Número de identificación',
        placeholder: 'Ingresa el número de identificación de la persona',
        min: 1,
      },
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
        placeholder: 'Ingresa el nombre de la persona',
      },
      {
        type: 'text',
        name: 'surname',
        label: 'Apellido',
        placeholder: 'Ingresa el apellido de la persona',
      },
      {
        type: 'text',
        name: 'address',
        label: 'Dirección',
        placeholder: 'Ingresa la dirección de la persona',
        optional: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo electrónico',
        placeholder: 'Ingresa el correo electrónico de la persona',
      },
      {
        type: 'tel',
        name: 'phonenumber',
        label: 'Número de celular',
        placeholder: 'Ingresa el número de celular de la persona',
      },
      {
        type: 'select',
        name: 'gender',
        label: 'Género',
        placeholder: 'Selecciona el género de la persona',
        options: Object.values(Gender).map((gender) => ({
          value: gender,
          label: gender,
          className: 'capitalize',
        })),
        className: 'capitalize',
      },
      {
        type: 'date',
        name: 'birthdate',
        label: 'Fecha de nacimiento',
        max: getLegalAge().getTime(),
      },
      {
        type: 'select',
        name: 'bloodType',
        label: 'Grupo sanguíneo',
        placeholder: 'Selecciona el grupo sanguíneo de la persona',
        options: Object.values(BloodType).flatMap((bloodType) =>
          Object.values(RhFactor).map((rhFactor) => ({
            value: `${bloodType}${rhFactor}`,
            label: `${bloodType}${rhFactor}`,
          })),
        ),
        optional: true,
      },
      {
        type: 'text',
        name: 'ethnicity',
        label: 'Etnia',
        placeholder: 'Ingresa la etnia de la persona',
      },
      {
        type: 'text',
        name: 'occupation',
        label: 'Ocupación',
        placeholder: 'Ingresa la ocupación de la persona',
      },
      {
        type: 'select',
        name: 'civilStatus',
        label: 'Estado civil',
        placeholder: 'Selecciona el estado civil de la persona',
        optional: true,
        options: Object.values(CivilStatus).map((civilStatus) => ({
          value: civilStatus,
          label: civilStatus,
          className: 'capitalize',
        })),
        className: 'capitalize',
      },
      {
        type: 'select',
        name: 'roleId',
        label: 'Rol',
        placeholder: 'Selecciona el rol para el usuario',
        options: roles.map((role) => ({
          value: role.id,
          label: role.name,
          className: 'capitalize',
        })),
        className: 'capitalize',
      },
    ],
    [roles],
  );

  const onSubmit = async (data: PersonAssociatedWithUserSaveValues) => {};

  return (
    <Form {...form}>
      <FormUI<PersonAssociatedWithUserSaveValues>
        fields={fields}
        onSubmit={onSubmit}
        className='mt-8 space-y-4'
      >
        <SheetFooter>
          <Button type='submit' className='mt-4'>
            Crear usuario
          </Button>
        </SheetFooter>
      </FormUI>
    </Form>
  );
};
