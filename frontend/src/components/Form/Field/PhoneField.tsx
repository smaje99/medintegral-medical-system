import { Controller, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';

import styles from '../Form.module.scss';
import type { PhoneFieldAttributes } from './Field.dto';

function PhoneField<T>({
  name,
  type,
  obligatory,
  ...props
}: PhoneFieldAttributes<T>): React.JSX.Element {
  const { control, register } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: obligatory && props.required }}
      render={({ field }) => (
        <PhoneInput
          value={field.value}
          containerClass={styles['field-phone']}
          inputClass={styles['phone-input']}
          buttonClass={styles['phone-button']}
          dropdownClass={styles['phone-dropdown']}
          country='co'
          preferredCountries={['co']}
          localization={es}
          enableSearch
          searchPlaceholder='buscar'
          searchNotFound='No hay coincidencias'
          inputProps={{
            ...register(name),
            ...props,
            id: name,
          }}
        />
      )}
    />
  );
}

export default PhoneField;
