'use client';

import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  JSXElementConstructor,
  TextareaHTMLAttributes,
} from 'react';
import { type ControllerRenderProps, type Path, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

type ControllerProps<T extends object> = ControllerRenderProps<
  T,
  Path<T> | (Path<T> & (string | undefined))
>;

type InputFieldType = 'text' | 'number' | 'email' | 'date' | 'tel';

type FieldType = InputFieldType | 'textarea' | 'custom' | 'select';

type BaseFieldAttributes<T extends object> = {
  readonly label: string;
  readonly name: Path<T>;
  readonly type: FieldType;
  readonly optional?: boolean;
};

type InputFieldAttributes<T extends object> = BaseFieldAttributes<T> &
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > & {
    readonly type: InputFieldType;
  };

type InputFieldProps<T extends object> = InputFieldAttributes<T> & ControllerProps<T>;

function InputField<T extends object>(props: InputFieldProps<T>): React.JSX.Element {
  return (
    <FormControl>
      <Input {...props} />
    </FormControl>
  );
}

type TextareaFieldAttributes<T extends object> = BaseFieldAttributes<T> &
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
    readonly type: 'textarea';
  };

type TextareaProps<T extends object> = TextareaFieldAttributes<T> & ControllerProps<T>;

function TextareaField<T extends object>(props: TextareaProps<T>): React.JSX.Element {
  return (
    <FormControl>
      <Textarea {...props} />
    </FormControl>
  );
}

type SelectFieldAttributes<T extends object> = BaseFieldAttributes<T> & {
  readonly type: 'select';
  readonly placeholder?: string;
  readonly options: { value: string; label: string; className?: string }[];
  readonly className?: string;
};

type SelectProps<T extends object> = SelectFieldAttributes<T> & ControllerProps<T>;

function SelectField<T extends object>({
  onChange,
  value,
  options,
  placeholder,
  className,
}: SelectProps<T>): React.JSX.Element {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue
            className={className}
            placeholder={placeholder}
            aria-label={value}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map(({ label, value: optionValue, className: optionClassName }) => (
          <SelectItem key={optionValue} value={optionValue} className={optionClassName}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type CustomFieldAttributes<T extends object> = BaseFieldAttributes<T> & {
  readonly type: 'custom';
  readonly render: () => React.JSX.Element;
};

export type FieldAttributes<T extends object> =
  | InputFieldAttributes<T>
  | TextareaFieldAttributes<T>
  | SelectFieldAttributes<T>
  | CustomFieldAttributes<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fieldComponents = new Map<FieldType, JSXElementConstructor<any>>();

fieldComponents.set('text', InputField);
fieldComponents.set('number', InputField);
fieldComponents.set('email', InputField);
fieldComponents.set('date', InputField);
fieldComponents.set('tel', InputField);
fieldComponents.set('textarea', TextareaField);
fieldComponents.set('select', SelectField);

export function Field<T extends object>(props: FieldAttributes<T>): React.JSX.Element {
  const Component =
    props.type === 'custom' ? props.render : fieldComponents.get(props.type);

  if (!Component) {
    throw new Error(`Invalid field type: ${props.type}`);
  }

  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>

          {props.optional ? (
            <small
              className={cn(
                'text-tertiary-900 dark:text-tertiary-200',
                'ml-2',
                'text-xs font-semibold tracking-wider',
              )}
            >
              Opcional
            </small>
          ) : null}

          <Component {...field} {...props} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
