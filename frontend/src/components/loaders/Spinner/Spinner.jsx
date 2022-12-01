import styles from './Spinner.module.scss';

const Spinner = ({ full }) => {
    return (
        <div className={`${styles.container} ${full && styles.full}`}>
            <div className={styles.spinner}></div>
        </div>
    )
}

export default Spinner;