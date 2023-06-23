import { IoMdRemoveCircleOutline } from 'react-icons/io';

import styles from './Badge.module.scss';

interface Props extends React.HTMLProps<HTMLSpanElement> {
  color: 'green' | 'blue' | 'green-blue';
  onClose?: (item: string) => void;
  titleClose?: string;
  children: React.ReactNode;
}

const Badge: React.FC<Props> = ({
  color,
  onClose,
  titleClose,
  children,
  className,
  ...props
}) => {
  return (
    <span className={`${styles.badge} ${styles[color]} ${className}`} {...props}>
      {children}
      {onClose ? (
        <i
          className={styles.close}
          onClick={() => onClose(children.toString())}
          title={titleClose}
        >
          <IoMdRemoveCircleOutline />
        </i>
      ) : null}
    </span>
  );
};

export default Badge;
