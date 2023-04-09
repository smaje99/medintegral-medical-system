import Link from 'next/link';
import { BsInfoSquareFill } from 'react-icons/bs';
import { FaUserSlash } from 'react-icons/fa';

import styles from './TitleCell.module.scss'

type Props = Pick<
    React.HTMLProps<HTMLAnchorElement>,
    'href' | 'children' | 'title'
> & {
    isActive?: boolean;
}

const TitleCell: React.FC<Props> = ({
    href, title, isActive = true, children
}) => {
    return (
        <div className={styles.cell}>
            <span className={styles.title}>
                {children}
                {!isActive ? <FaUserSlash /> : null}
            </span>
            <Link href={href}>
                <a className={styles["button-link"]} title={title}>
                    <BsInfoSquareFill /> Ver
                </a>
            </Link>
        </div>
    )
}

export default TitleCell;