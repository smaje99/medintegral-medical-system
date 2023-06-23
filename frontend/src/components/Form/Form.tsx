import { useId } from 'react';
import { type SubmitHandler, useFormContext } from 'react-hook-form';

import Commands, { type CommandAttributes } from './Commands';
import Field, { type FieldAttributes } from './Field';
import styles from './Form.module.scss';

type Props<T> = {
  readonly data: FieldAttributes<T>[];
  readonly commands: CommandAttributes;
} & Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
> & {
    readonly onSubmit?: SubmitHandler<T>;
  };

/**
 * This component must be wrapped in a FormProvider of react-hook-form
 */
function Form<T>({ data, commands, onSubmit, ...props }: Props<T>) {
  const { handleSubmit } = useFormContext<T>();
  const formId = useId();

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {data.map((field) => (
        <Field<T> key={`${formId}-${field.name}`} {...field} />
      ))}

      <Commands data={commands} />
    </form>
  );
}

export default Form;
