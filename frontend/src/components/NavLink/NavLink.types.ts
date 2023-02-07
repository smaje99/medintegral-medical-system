export interface NavLinkProps extends Omit<
    React.HTMLProps<HTMLAnchorElement>, 'className'
> {
    className?: string | ((active: boolean) => string);
}