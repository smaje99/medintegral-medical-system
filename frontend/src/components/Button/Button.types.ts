export interface ButtonProps extends React.HTMLProps<
    HTMLAnchorElement | HTMLButtonElement | HTMLInputElement
> {
    as: 'a' | 'button' | 'input';
    className?: string;
    stylesFor: 'primary' | 'secondary' | 'floating' | 'icon' | 'cell';
    children: React.ReactNode;
}

export interface ButtonAnchorProps extends React.HTMLProps<HTMLAnchorElement> { }

export interface ButtonAuxProps extends React.HTMLProps<HTMLButtonElement> { }

export interface ButtonInputProps extends React.HTMLProps<HTMLInputElement> { }