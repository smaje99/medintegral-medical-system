export interface NavLinkProps {
    href: string;
    className?: string | ((active: boolean) => string);
    children: React.ReactNode;
}