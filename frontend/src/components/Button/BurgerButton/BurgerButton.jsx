import { useReducer } from 'react';

import styles from './BurgerButton.module.scss';

const BurgerButton = ({ className, onEvent }) => {
    const [isActive, handleBurger] = useReducer((state) => {
        const newState = !state;
        onEvent(newState);
        return newState;
    }, false);

    return (
        <div>
            <button
                className={`${styles.burger} ${isActive && styles.open} ${className}`}
                onClick={handleBurger}
            ></button>
        </div>
    )
}

export default BurgerButton;