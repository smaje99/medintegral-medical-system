import type { Path } from "react-hook-form";

type InputFieldType = 'text' | 'number' | 'email' | 'date';

export type FieldType = InputFieldType
    | 'select'
    | 'password'
    | 'textarea'
    | 'phone'
    | 'custom';

export type BaseFieldAttributes<T> = {
    readonly label: string;
    readonly name: Path<T>;
    readonly type: FieldType;
    readonly obligatory?: boolean;
    readonly legend?: string;
}

export type InputFieldAttributes<T> = BaseFieldAttributes<T> & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> & {
    readonly type: InputFieldType;
}

export type SelectFieldAttributes<T> = BaseFieldAttributes<T> & {
    readonly type: 'select';
    readonly options: { label: string; value: string }[];
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export type PasswordFieldAttributes<T> = Omit<InputFieldAttributes<T>, 'type'> & {
    readonly type: 'password';
}

export type TextAreaFieldAttributes<T> = BaseFieldAttributes<T> & {
    readonly type: 'textarea';
} & React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement
>;

export type PhoneFieldAttributes<T> = BaseFieldAttributes<T> & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> & {
    readonly type: 'phone';
}

export type CustomFieldAttributes<T> = BaseFieldAttributes<T> & {
    readonly type: 'custom';
    readonly render: () => JSX.Element;
    readonly required?: boolean;
}

export type FieldAttributes<T> = InputFieldAttributes<T>
    | SelectFieldAttributes<T>
    | PasswordFieldAttributes<T>
    | TextAreaFieldAttributes<T>
    | PhoneFieldAttributes<T>
    | CustomFieldAttributes<T>;