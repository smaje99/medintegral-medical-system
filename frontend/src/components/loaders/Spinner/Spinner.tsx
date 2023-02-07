import type { SpinnerProps } from './Spinner.types';

import styles from './Spinner.module.scss';

const Spinner: React.FC<SpinnerProps> = ({ full, size = 'm' }) => {
    return (
        <div className={`${styles.container} ${full && styles.full}`}>
            <div className={`${styles.spinner} ${styles[size]}`}></div>
        </div>
    )
}

export default Spinner;