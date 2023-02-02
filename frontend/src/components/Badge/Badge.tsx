import { BadgeProps } from './Badge.types';

import styles from './Badge.module.scss';

const Badge = ({ children, className, color, ...props }: BadgeProps) => {
    return (
        <span
            className={`${styles["badge"]} ${styles[color]} ${className}`}
            {...props}
        >
            {children}
        </span>
    )
}

export default Badge;