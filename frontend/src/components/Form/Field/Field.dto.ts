import type { ImageProps } from 'next/future/image';
import type {
    DetailedHTMLProps,
    InputHTMLAttributes,
    SelectHTMLAttributes,
    TextareaHTMLAttributes
} from 'react';
import type { Path } from 'react-hook-form';

type InputFieldType = 'text' | 'number' | 'email' | 'date';

export type FieldType = InputFieldType
    | 'select'
    | 'password'
    | 'textarea'
    | 'phone'
    | 'custom'
    | 'file';

export type BaseFieldAttributes<T> = {
    readonly label: string;
    readonly name: Path<T>;
    readonly type: FieldType;
    readonly obligatory?: boolean;
    readonly legend?: string;
}

export type InputFieldAttributes<T> = BaseFieldAttributes<T> & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> & {
    readonly type: InputFieldType;
}

export type SelectFieldAttributes<T> = BaseFieldAttributes<T> & {
    readonly type: 'select';
    readonly options: { label: string; value: string }[];
} & DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export type PasswordFieldAttributes<T> = Omit<InputFieldAttributes<T>, 'type'> & {
    readonly type: 'password';
}

export type TextAreaFieldAttributes<T> = BaseFieldAttributes<T> & {
    readonly type: 'textarea';
} & DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement
>;

export type PhoneFieldAttributes<T> = Omit<InputFieldAttributes<T>, 'type'> & {
    readonly type: 'phone';
}

export type CustomFieldAttributes<T> = BaseFieldAttributes<T> & {
    readonly type: 'custom';
    readonly render: () => JSX.Element;
    readonly required?: boolean;
}

export type FileFieldAttributes<T> = Omit<InputFieldAttributes<T>, 'type'> & {
    readonly type: 'file';
    readonly onFileChange: (files: File[]) => void;
    readonly image?: ImageProps;
}

export type FieldAttributes<T> = InputFieldAttributes<T>
    | SelectFieldAttributes<T>
    | PasswordFieldAttributes<T>
    | TextAreaFieldAttributes<T>
    | PhoneFieldAttributes<T>
    | CustomFieldAttributes<T>
    | FileFieldAttributes<T>;