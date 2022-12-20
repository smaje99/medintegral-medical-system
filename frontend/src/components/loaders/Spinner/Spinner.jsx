import styles from './Spinner.module.scss';

const Spinner = ({ full, size = 'm' }) => {
    return (
        <div className={`${styles.container} ${full && styles.full}`}>
            <div className={`${styles.spinner} ${styles[size]}`}></div>
        </div>
    )
}

export default Spinner;