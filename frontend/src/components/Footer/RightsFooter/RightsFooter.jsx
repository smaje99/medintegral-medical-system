import styles from './RightsFooter.module.scss'

const RightsFooter = () => {
    return (
        <footer className={styles.footer}>
            <span className={styles.copyright}>
                &copy; {new Date().getFullYear()} - Medicina Integral del Caquetá IPS S.A.S
            </span>
        </footer>
    )
}

export default RightsFooter;