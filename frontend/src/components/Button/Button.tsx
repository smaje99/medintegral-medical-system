import Link from 'next/link';

import styles from './Button.module.scss';
import {
    ButtonAnchorProps,
    ButtonAuxProps,
    ButtonInputProps,
    ButtonProps
} from './Button.types';

const ButtonAnchor = ({ children, ...props }: ButtonAnchorProps) => (
    <Link href={props.href}>
        <a {...props}>
            {children}
        </a>
    </Link>
)

const ButtonInput = (props: ButtonInputProps) => (
    <input {...props} />
)

const ButtonAux = ({ children, ...props }: ButtonAuxProps) => (
    <button {...props}>
        {children}
    </button>
)

const Button = ({ className, stylesFor, as, children, ...props }: ButtonProps) => {
    const getButton = () => {
        switch (as) {
            case 'a':
                return (
                    <ButtonAnchor
                        className={`${styles.button} ${styles[stylesFor]} ${className}`}
                        {...props as ButtonAnchorProps}
                    >
                        {children}
                    </ButtonAnchor>
                )
            case 'button':
                return (
                    <ButtonAux
                        className={`${styles.button} ${styles[stylesFor]} ${className}`}
                        {...props as ButtonAuxProps}
                    >
                        {children}
                    </ButtonAux>
                )
            case 'input':
                return (
                    <ButtonInput
                        className={`${styles.button} ${styles[stylesFor]} ${className}`}
                        value={children as string}
                        {...props as ButtonInputProps}
                    />
                )
        }
    }

    return <>{getButton()}</>;
}

export default Button;