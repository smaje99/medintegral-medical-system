import Link from 'next/link';
import { useMemo } from 'react';

import styles from './Button.module.scss';

interface ButtonBaseProps {
  as: 'a' | 'button' | 'input';
  stylesFor:
    | 'primary'
    | 'secondary'
    | 'floating'
    | 'icon'
    | 'cell'
    | 'primary-fit'
    | 'secondary-fit';
  children: React.ReactNode;
}

type ButtonAnchorProps = ButtonBaseProps & {
  as: 'a';
} & React.HTMLProps<HTMLAnchorElement>;

const ButtonAnchor: React.FC<ButtonAnchorProps> = ({ children, ...props }) => (
  <Link href={props.href}>
    <a {...props}>{children}</a>
  </Link>
);

export type ButtonInputProps = ButtonBaseProps & {
  as: 'input';
} & Omit<React.HTMLProps<HTMLInputElement>, 'type'> & {
    type: 'submit' | 'reset';
  };

const ButtonInput: React.FC<ButtonInputProps> = ({ children, ...props }) => (
  <input {...props} value={children.toString()} />
);

type ButtonAuxProps = ButtonBaseProps & {
  as: 'button';
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

const ButtonAux: React.FC<ButtonAuxProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

type ButtonProps = ButtonAnchorProps | ButtonAuxProps | ButtonInputProps;

const Button: React.FC<ButtonProps> = ({ as, stylesFor, className, ...props }) => {
  const propsMemo = useMemo(
    () => ({
      ...props,
      className: `${styles.button} ${styles[stylesFor]} ${className ?? ''}`,
    }),
    [props, className, stylesFor]
  );

  switch (as) {
    case 'a':
      return <ButtonAnchor {...(propsMemo as ButtonAnchorProps)} />;
    case 'button':
      return <ButtonAux {...(propsMemo as ButtonAuxProps)} />;
    case 'input':
      return <ButtonInput {...(propsMemo as ButtonInputProps)} />;
    default:
      throw new Error('Invalid Field Type');
  }
};

export default Button;
