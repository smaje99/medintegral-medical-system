export type IdentificationCellProps = Pick<
    React.HTMLProps<HTMLAnchorElement>,
    'href' | 'children' | 'title'
> & {
    isActive: boolean;
}