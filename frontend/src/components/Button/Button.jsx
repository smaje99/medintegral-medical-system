import { forwardRef } from 'react'

import styles from './Button.module.scss';

const ButtonAnchor = forwardRef(({children, ...props }, ref) => (
    <a ref={ref} {...props}>
        {children}
    </a>
))

const ButtonAux = ({ children, ...props }) => (
    <button {...props}>
        {children}
    </button>
)

const Button = forwardRef(({ className, style, as="a", children, ...props }, ref) => {
    const isAnchor = () => as === 'a';

    return (
        <>
            {isAnchor()
                ? (<ButtonAnchor ref={ref} className={`${styles.button} ${styles[style]} ${className}`}>
                    {children}
                </ButtonAnchor>)
                : (<ButtonAux className={`${styles.button} ${styles[style]} ${className}`}>
                    {children}
                </ButtonAux>)
            }
        </>
    )
})

export default Button;