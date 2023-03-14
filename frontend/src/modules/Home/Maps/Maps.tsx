import homeStyles from '../Home.module.scss';
import styles from './Maps.module.scss';

const Maps = () => (
    <section id="ubicanos" className={homeStyles.section}>
        <h2 className={homeStyles.title}>Ubícanos</h2>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.816941040367!2d-75.60566226039728!3d1.610312675763597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e244e11723baa95%3A0x3ad0ed9bb0d0f128!2sInstituto%20De%20Medicina%20Legal%20Y%20Ciencias%20Forenses!5e1!3m2!1ses!2sco!4v1678766652800!5m2!1ses!2sco"
            className={styles.maps}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        >
        </iframe>
    </section>
)

export default Maps;