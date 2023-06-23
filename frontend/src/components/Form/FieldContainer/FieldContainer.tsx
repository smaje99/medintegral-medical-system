import styles from '../Form.module.scss';

interface Props {
  htmlFor: string;
  title: string;
  obligatory?: boolean;
  legend?: string;
  children: React.JSX.Element | React.JSX.Element[];
}

const FieldContainer: React.FC<Props> = ({
  htmlFor,
  title,
  obligatory,
  legend,
  children,
}) => {
  return (
    <label htmlFor={htmlFor} className={styles.content}>
      <span className={styles.title} data-obligatory={obligatory ? 'yes' : 'no'}>
        {title}
      </span>
      {legend ? <span className={styles.legend}>{legend}</span> : null}
      <div className={styles['field-container']}>{children}</div>
    </label>
  );
};

export default FieldContainer;
