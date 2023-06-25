import { useEffect, useId, useRef } from 'react';

import styles from './Input.module.scss';

type IndeterminateCheckboxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  indeterminate?: boolean;
};

function IndeterminateCheckbox({ indeterminate, ...rest }: IndeterminateCheckboxProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const checkboxId = useId();

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <label htmlFor={checkboxId} className={styles.checkbox}>
      <input id={checkboxId} type='checkbox' ref={ref} {...rest} />
      <div className={styles.checkmark}></div>
    </label>
  );
}

export default IndeterminateCheckbox;
