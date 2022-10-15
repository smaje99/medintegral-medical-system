import { forwardRef, useImperativeHandle, useReducer } from 'react';

import styles from './BurgerButton.module.scss';

const BurgerButton = forwardRef(({ className, onEvent }, ref) => {
    const [isActive, handleBurger] = useReducer((state) => {
        const newState = !state;
        onEvent && onEvent(newState);
        return newState;
    }, false);

    useImperativeHandle(ref, () => ({ handleBurger }), []);

    return (
        <div>
            <button
                className={`${styles.burger} ${isActive && styles.open} ${className}`}
                onClick={handleBurger}
            ></button>
        </div>
    )
})

export default BurgerButton;