import Link from 'next/link';
import { BsInfoSquareFill } from 'react-icons/bs';

import routes from '@Helpers/routes';

import styles from './IdentificationCell.module.scss';

function IdentificationCell({ value }: { value: string }) {
    return (
        <div className={styles["cell"]}>
            <span className={styles["identification"]}>
                {Intl.NumberFormat('es-CO').format(parseInt(value))}
            </span>
            <Link href={routes.dashboard.user(value)}>
                <a
                    className={styles["button-link"]}
                    title="ver información general del usuario"
                >
                    <BsInfoSquareFill /> Ver
                </a>
            </Link>
        </div>
    )
}

export default IdentificationCell;