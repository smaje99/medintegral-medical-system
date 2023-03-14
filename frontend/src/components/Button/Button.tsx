import Link from 'next/link';
import { useMemo } from 'react';

import type {
    ButtonAnchorProps, ButtonAuxProps, ButtonInputProps, ButtonProps
} from './Button.types';

import styles from './Button.module.scss';

const ButtonAnchor: React.FC<ButtonAnchorProps> = ({ children, ...props }) => (
    <Link href={props.href}>
        <a {...props}>
            {children}
        </a>
    </Link>
)

const ButtonInput: React.FC<ButtonInputProps> = ({ children, ...props}) => (
    <input {...props} value={children.toString()} />
)

const ButtonAux: React.FC<ButtonAuxProps> = ({ children, ...props }) => (
    <button {...props}>
        {children}
    </button>
)

const Button: React.FC<ButtonProps> = ({ as, stylesFor, className, ...props }) => {
    const propsMemo = useMemo(() => ({
        ...props,
        className: `${styles.button} ${styles[stylesFor]} ${className ?? ''}`
    }), []);

    switch (as) {
        case 'a':
            return <ButtonAnchor {...propsMemo as ButtonAnchorProps} />
        case 'button':
            return <ButtonAux {...propsMemo as ButtonAuxProps} />
        case 'input':
            return <ButtonInput {...propsMemo as ButtonInputProps} />
        default:
            throw new Error("Invalid Field Type");
    }
}

export default Button;