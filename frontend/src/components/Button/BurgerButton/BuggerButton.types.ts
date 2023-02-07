export interface BurgerButtonProps extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
> {
    onEvent?: (active: boolean) => void;
}

export interface BurgerButtonActions {
    handleBurger: () => void;
}