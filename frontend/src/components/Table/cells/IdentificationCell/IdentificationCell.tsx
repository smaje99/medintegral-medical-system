import Link from 'next/link';
import { BsInfoSquareFill } from 'react-icons/bs';

import { IdentificationCellProps } from './IdentificationCell.types';

import styles from './IdentificationCell.module.scss';

function IdentificationCell({ href, title, children }: IdentificationCellProps) {
    return (
        <div className={styles["cell"]}>
            <span className={styles["identification"]}>
                {Intl.NumberFormat('es-CO').format(
                    parseInt(children.toString())
                )}
            </span>
            <Link href={href}>
                <a
                    className={styles["button-link"]}
                    title={title}
                >
                    <BsInfoSquareFill /> Ver
                </a>
            </Link>
        </div>
    )
}

export default IdentificationCell;