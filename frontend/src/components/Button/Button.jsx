import Link from 'next/link';

import styles from './Button.module.scss';

const ButtonAnchor = ({href, children, ...props }) => (
    <Link href={href}>
        <a {...props}>
            {children}
        </a>
    </Link>
)

const ButtonInput = (props) => (
    <input {...props} />
)

const ButtonAux = ({ children, ...props }) => (
    <button {...props}>
        {children}
    </button>
)

const Button = ({ href, className, style, as="a", children, ...props }) => {
    const getButton = () => {
        switch (as) {
            case 'a':
                return (
                    <ButtonAnchor
                        href={href}
                        className={`${styles.button} ${styles[style]} ${className}`}
                        {...props}
                    >
                        {children}
                    </ButtonAnchor>
                )
            case 'button':
                return (
                    <ButtonAux
                        className={`${styles.button} ${styles[style]} ${className}`}
                        {...props}
                    >
                        {children}
                    </ButtonAux>
                )
            case 'input':
                return (
                    <ButtonInput
                        className={`${styles.button} ${styles[style]} ${className}`}
                        value={children}
                        {...props}
                    />
                )
        }
    }

    return <>{getButton()}</>;
}

export default Button;