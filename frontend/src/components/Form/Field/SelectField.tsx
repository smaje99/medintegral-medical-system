import { useFormContext } from 'react-hook-form';

import styles from '../Form.module.scss';
import { SelectFieldAttributes } from './Field.dto';

function SelectField<T>({
  name,
  options,
  ...props
}: SelectFieldAttributes<T>): React.JSX.Element {
  const { register } = useFormContext();

  return (
    <select className={styles['field-select']} {...props} {...register(name)} id={name}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectField;
