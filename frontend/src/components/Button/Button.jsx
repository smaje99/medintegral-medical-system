import Link from 'next/link';

import styles from './Button.module.scss';

const ButtonAnchor = ({href, children, ...props }) => (
    <Link href={href}>
        <a {...props}>
            {children}
        </a>
    </Link>
)

const ButtonAux = ({ children, ...props }) => (
    <button {...props}>
        {children}
    </button>
)

const Button = ({ href, className, style, as="a", children, ...props }) => {
    const isAnchor = () => as === 'a';

    return (
        <>
            {isAnchor()
                ? (<ButtonAnchor
                    href={href}
                    className={`${styles.button} ${styles[style]} ${className}`}
                    {...props}
                >
                    {children}
                </ButtonAnchor>)
                : (<ButtonAux
                    className={`${styles.button} ${styles[style]} ${className}`}
                    {...props}
                >
                    {children}
                </ButtonAux>)
            }
        </>
    )
}

export default Button;