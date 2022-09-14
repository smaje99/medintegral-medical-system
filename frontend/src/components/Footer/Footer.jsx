import Image from 'next/future/image';
import { BsFillTelephoneFill, BsFillPhoneFill, BsWhatsapp } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';

import styles from './Footer.module.scss';

import medintegralIcon from '@Icons/medintegral.svg';

const Info = ({ title, children }) => (
    <section className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        {children}
    </section>
)

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Image
                src={medintegralIcon}
                className={styles.brand}
                alt="Medintegral I.P.S. S.A.S."
                priority
            />
            <section className={styles.group}>
                <Info title="Dirección">
                    <span className={styles.subinfo}>
                        Cra. 13 # 6-104 Juan XXIII<br />
                        Florencia - Caquetá
                    </span>
                </Info>
                <Info title="Horario de atención">
                    <ul className={styles.info_list}>
                        <li className={styles.subinfo}>
                            <strong>Lunes a Viernes</strong><br />
                            7:00 a.m. - 12:00 m.<br />
                            2:00 p.m. - 6:00 p.m.
                        </li>
                        <li className={styles.subinfo}>
                            <strong>Sábado</strong><br />
                            9:00 a.m. - 12:00 m.
                        </li>
                    </ul>
                </Info>
                <Info title="Contáctenos">
                    <ul className={styles.info_list}>
                        <li className={styles.subinfo}>
                            <a href="tel:+576084355711">
                                <BsFillTelephoneFill /> (608) 435 57 11
                            </a>
                        </li>
                        <li className={styles.subinfo}>
                            <a href="tel:+573115045647">
                                <BsFillPhoneFill /> 311 504 5647
                            </a>
                        </li>
                        <li className={styles.subinfo}>
                            <a href="https://wa.me/573105803056" target="_blank">
                                <BsWhatsapp /> 310 580 3056
                            </a>
                        </li>
                        <li className={styles.subinfo}>
                            <a href="mailto:medintegralflorencia@gmail.com" target="_blank">
                                <FiMail /> medintegralflorencia@gmail.com
                            </a>
                        </li>
                    </ul>
                </Info>
            </section>
            <span className={styles.copyright}>
                &copy; 2022 - Medicina Integral del Caquetá IPS S.A.S
            </span>
        </footer>
    )
}

export default Footer;