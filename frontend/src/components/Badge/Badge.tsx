import { IoMdRemoveCircleOutline } from 'react-icons/io';

import { BadgeProps } from './Badge.types';

import styles from './Badge.module.scss';

const Badge: React.FC<BadgeProps> = ({
    color, onClose, titleClose, children, className, ...props
}) => {
    return (
        <span
            className={`${styles['badge']} ${styles[color]} ${className}`}
            {...props}
        >
            {children}
            {onClose ? (
                <i
                    className={styles['close']}
                    onClick={() => onClose(children.toString())}
                    title={titleClose}
                >
                    <IoMdRemoveCircleOutline />
                </i>
            ): null}
        </span>
    )
}

export default Badge;