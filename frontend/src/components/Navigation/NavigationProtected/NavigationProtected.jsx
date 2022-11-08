import useAuth from '@Auth/useAuth';
import Button from '@Components/Button';

import styles from './NavigationProtected.module.scss'

function getGreetings(hour) {
    if (hour < 12) {
        return 'Buenos días';
    } else if (hour >= 18) {
        return 'Buenas noches';
    } else {
        return 'Buenas tardes';
    }
}

const NavigationProtected = () => {
    const { user, logout } = useAuth();
    const hour = new Date(Date.now()).getHours();

    return (
        <nav className={styles.navigation}>
            <section className={styles.section}>
                <span className={styles.statement}>
                    {getGreetings(hour)}
                </span>
                <span className={styles.statement}>
                    {user?.username}
                </span>
                <hr />
            </section>
            <ul className={styles.nav}>
                
            </ul>
            <Button
                as="button"
                style="floating"
                onClick={logout}
                className={styles.button}
            >
                Cerrar sesión
            </Button>
        </nav>
    )
}

export default NavigationProtected;