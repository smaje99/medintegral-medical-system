import { useFormContext } from 'react-hook-form';

import styles from '../Form.module.scss';
import type { InputFieldAttributes } from './Field.dto';

function InputField<T>({
  name,
  type,
  ...props
}: InputFieldAttributes<T>): React.JSX.Element {
  const { register } = useFormContext();

  return (
    <input
      className={styles['field-input']}
      {...props}
      {...register(name)}
      id={name}
      type={type}
    />
  );
}

export default InputField;
