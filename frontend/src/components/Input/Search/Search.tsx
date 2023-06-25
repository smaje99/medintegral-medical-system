import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FaSearch } from 'react-icons/fa';

import DebouncedInput from '../DebouncedInput';
import styles from './Search.module.scss';

type Props = {
  readonly name: string;
  readonly onChange: (value: string | number) => void;
  readonly value: string | number;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
>;

const Search: React.FC<Props> = ({ name, ...props }) => {
  return (
    <label htmlFor={name} className={styles.search}>
      <FaSearch aria-hidden />
      <DebouncedInput
        type='search'
        id={name}
        name={name}
        className={styles.input}
        placeholder='Buscar...'
        {...props}
      />
    </label>
  );
};

export default Search;
