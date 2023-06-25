import { forwardRef, useImperativeHandle, useReducer } from 'react';

import styles from './BurgerButton.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onEvent?: (active: boolean) => void;
}

export interface BurgerButtonActions {
  handleBurger: () => void;
}

type HandleBurgerReducer = (state: boolean) => boolean;

const BurgerButton = forwardRef<BurgerButtonActions, Props>(
  function BurgerButtonComponent({ className, onEvent }: Props, ref) {
    const [isActive, handleBurger] = useReducer<HandleBurgerReducer>((state) => {
      const newState = !state;
      onEvent?.(newState);
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
    );
  }
);

export default BurgerButton;
