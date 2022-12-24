import styles from './Spinner.module.scss';

interface SpinnerProps {
    full?: boolean
    size?: 's' | 'm'
}

const Spinner = ({ full, size = 'm' }: SpinnerProps) => {
    return (
        <div className={`${styles.container} ${full && styles.full}`}>
            <div className={`${styles.spinner} ${styles[size]}`}></div>
        </div>
    )
}

export default Spinner;