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
import * as domain from '@/modules/user/role/domain';
import {
  personAssociatedWithUserSaveSchema,
  type PersonAssociatedWithUserSaveValues,
} from '@/modules/user/user/domain';
import { userCreateController } from '@/modules/user/user/infrastructure/userContainer';

type Props = {
  readonly roles: domain.RoleAttributes[];
  readonly showOptionalFields: boolean;
  readonly setOpenSheet: (isOpen: boolean) => void;
};

export const CreateUserForm: React.FC<Props> = ({
  roles,
  showOptionalFields,
  setOpenSheet,
}) => {
  const form = useForm<PersonAssociatedWithUserSaveValues>({
    resolver: zodResolver(personAssociatedWithUserSaveSchema),
  });

  const fields = useMemo<FieldAttributes<PersonAssociatedWithUserSaveValues>[]>(
    () =>
      [
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
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
        {
          type: 'number',
          name: 'dni',
          label: 'Número de identificación',
          placeholder: 'Ingresa el número de identificación de la persona',
          min: 1,
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
        {
          type: 'text',
          name: 'name',
          label: 'Nombre',
          placeholder: 'Ingresa el nombre de la persona',
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
        {
          type: 'text',
          name: 'surname',
          label: 'Apellido',
          placeholder: 'Ingresa el apellido de la persona',
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
        showOptionalFields &&
          ({
            type: 'text',
            name: 'address',
            label: 'Dirección',
            placeholder: 'Ingresa la dirección de la persona',
            optional: true,
          } as FieldAttributes<PersonAssociatedWithUserSaveValues>),
        {
          type: 'email',
          name: 'email',
          label: 'Correo electrónico',
          placeholder: 'Ingresa el correo electrónico de la persona',
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
        {
          type: 'tel',
          name: 'phonenumber',
          label: 'Número de celular',
          placeholder: 'Ingresa el número de celular de la persona',
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
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
          className: '[&>span]:capitalize',
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
        {
          type: 'date',
          name: 'birthdate',
          label: 'Fecha de nacimiento',
          max: getLegalAge().getTime(),
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
        showOptionalFields &&
          ({
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
          } as FieldAttributes<PersonAssociatedWithUserSaveValues>),
        showOptionalFields &&
          ({
            type: 'text',
            name: 'ethnicity',
            label: 'Etnia',
            placeholder: 'Ingresa la etnia de la persona',
            optional: true,
          } as FieldAttributes<PersonAssociatedWithUserSaveValues>),
        showOptionalFields &&
          ({
            type: 'text',
            name: 'occupation',
            label: 'Ocupación',
            placeholder: 'Ingresa la ocupación de la persona',
            optional: true,
          } as FieldAttributes<PersonAssociatedWithUserSaveValues>),
        showOptionalFields &&
          ({
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
            className: '[&>span]:capitalize',
          } as FieldAttributes<PersonAssociatedWithUserSaveValues>),
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
          className: '[&>span]:capitalize',
        } as FieldAttributes<PersonAssociatedWithUserSaveValues>,
      ].filter(Boolean) as FieldAttributes<PersonAssociatedWithUserSaveValues>[],
    [roles, showOptionalFields],
  );

  const onSubmit = async (data: PersonAssociatedWithUserSaveValues) => {
    await userCreateController.run(data, setOpenSheet);
  };

  return (
    <Form {...form}>
      <FormUI<PersonAssociatedWithUserSaveValues>
        fields={fields}
        onSubmit={onSubmit}
        className='mt-4 space-y-4'
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
