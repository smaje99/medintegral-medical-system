import { useMemo } from 'react';

import { FieldContainer } from '..';
import type { FieldAttributes, FieldType } from './Field.dto';
import FileField from './FileField';
import InputField from './InputField';
import PasswordField from './PasswordField';
import PhoneField from './PhoneField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';

const fieldComponents = new Map<FieldType, React.FC>();
fieldComponents.set('text', InputField);
fieldComponents.set('number', InputField);
fieldComponents.set('email', InputField);
fieldComponents.set('date', InputField);
fieldComponents.set('select', SelectField);
fieldComponents.set('password', PasswordField);
fieldComponents.set('textarea', TextAreaField);
fieldComponents.set('phone', PhoneField);
fieldComponents.set('file', FileField);

/**
 * Field Factory
 */
function Field<T = object>({
  obligatory,
  ...props
}: FieldAttributes<T>): React.JSX.Element {
  const FieldComponent = useMemo(
    () =>
      props.type === 'custom'
        ? props.render
        : (fieldComponents.get(props.type) as React.FC<FieldAttributes<T>>),
    [props]
  );

  return (
    <FieldContainer
      htmlFor={props.name}
      title={props.label}
      obligatory={obligatory ?? props.required}
      legend={props.legend}
    >
      <FieldComponent {...{ ...props, required: props.required ?? obligatory }} />
    </FieldContainer>
  );
}

export default Field;
