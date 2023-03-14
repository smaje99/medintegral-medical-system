interface ButtonBaseProps {
    as: 'a' | 'button' | 'input';
    stylesFor: 'primary'
        | 'secondary'
        | 'floating'
        | 'icon'
        | 'cell'
        | 'primary-fit'
        | 'secondary-fit';
    children: React.ReactNode;
};

export type ButtonAnchorProps = ButtonBaseProps & {
    as: 'a';
} & React.HTMLProps<HTMLAnchorElement>;

export type ButtonAuxProps = ButtonBaseProps & {
    as: 'button';
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>;

export type ButtonInputProps = ButtonBaseProps & {
    as: 'input';
} & Omit<React.HTMLProps<HTMLInputElement>, 'type'> & {
    type: 'submit' | 'reset'
}

export type ButtonProps = ButtonAnchorProps | ButtonAuxProps | ButtonInputProps;