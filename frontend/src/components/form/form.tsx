'use client';

import { useId } from 'react';
import { type SubmitHandler, useFormContext } from 'react-hook-form';

import { Field, type FieldAttributes } from './field';

type Props<Data extends object> = {
  readonly fields: FieldAttributes<Data>[];
} & Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
> & {
    readonly onSubmit: SubmitHandler<Data>;
  };

/**
 * This component must be wrapped in a FormProvider of react-hook-form
 */
export function FormUI<Data extends object>({
  fields,
  onSubmit,
  children,
  ...props
}: Props<Data>): React.JSX.Element {
  const { handleSubmit } = useFormContext<Data>();
  const formId = useId();

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <Field key={`${formId}-${field.name}`} {...field} />
      ))}

      {children ?? null}
    </form>
  );
}
