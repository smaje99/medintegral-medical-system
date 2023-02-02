import { useEffect, useId, useRef } from 'react';

import { IndeterminateCheckboxProps } from './Input.types';

import styles from './Input.module.scss';

function IndeterminateCheckbox({ indeterminate, ...rest }: IndeterminateCheckboxProps) {
    const ref = useRef<HTMLInputElement>(null!);
    const checkboxId = useId();

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate]);

    return (
        <label htmlFor={checkboxId} className={styles["checkbox"]}>
            <input
                id={checkboxId}
                type="checkbox"
                ref={ref}
                {...rest}
            />
            <div className={styles["checkmark"]}></div>
        </label>
    )
}

export default IndeterminateCheckbox;