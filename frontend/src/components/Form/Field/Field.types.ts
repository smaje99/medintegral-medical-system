export interface FieldProps {
    htmlFor: string;
    title: string;
    obligatory?: boolean;
    legend?: string
    children: JSX.Element | JSX.Element[];
}