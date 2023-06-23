import { useFormContext } from 'react-hook-form';

import styles from '../Form.module.scss';
import type { TextAreaFieldAttributes } from './Field.dto';

function TextAreaField<T>({
  name,
  ...props
}: TextAreaFieldAttributes<T>): React.JSX.Element {
  const { register } = useFormContext();

  return (
    <textarea
      className={styles['field-textarea']}
      {...props}
      {...register(name)}
      id={name}
    ></textarea>
  );
}

export default TextAreaField;
