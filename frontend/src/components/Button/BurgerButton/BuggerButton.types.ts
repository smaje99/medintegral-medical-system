export interface BurgerButtonProps {
    className?: string;
    onEvent?: (active: boolean) => void;
}

export interface BurgerButtonActions {
    handleBurger: () => void;
}