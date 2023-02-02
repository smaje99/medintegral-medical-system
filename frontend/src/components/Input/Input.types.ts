export interface DebouncedInputProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>, 'onChange'
> {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
}

export interface IndeterminateCheckboxProps extends React.HTMLProps<HTMLInputElement> {
    indeterminate?: boolean;
}