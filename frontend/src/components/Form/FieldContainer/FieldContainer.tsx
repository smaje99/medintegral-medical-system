import { FieldContainerProps } from './FieldContainer.dto';

import styles from '../Form.module.scss';

const Field: React.FC<FieldContainerProps> = ({
    htmlFor, title, obligatory, legend, children
}) => {
    return (
        <label htmlFor={htmlFor} className={styles['content']}>
            <span className={styles['title']} data-obligatory={obligatory ? 'yes': 'no'}>
                {title}
            </span>
            {legend ? (
                <span className={styles['legend']}>{legend}</span>
            ) : null}
            <div className={styles['field-container']}>
                {children}
            </div>
        </label>
    )
}

export default Field;