import homeStyles from '../Home.module.scss';
import styles from './Maps.module.scss';

const Maps = () => (
    <section id="ubicanos" className={homeStyles.section}>
        <h2 className={homeStyles.title}>Ubícanos</h2>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.121582361089!2d-75.60913170101784!3d1.6100415833316144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e244e11f5209267%3A0x43638762c8f3dbb!2sCra.%2013%20%236%20104%2C%20Florencia%2C%20Caquet%C3%A1!5e0!3m2!1ses-419!2sco!4v1667516033147!5m2!1ses-419!2sco"
            className={styles.maps}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        >
        </iframe>
    </section>
)

export default Maps;