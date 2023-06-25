import styles from './Spinner.module.scss';

type SpinnerProps = {
  full?: boolean;
  size?: 's' | 'm';
};

const Spinner: React.FC<SpinnerProps> = ({ full, size = 'm' }) => {
  return (
    <div className={`${styles.container} ${full && styles.full}`}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
    </div>
  );
};

export default Spinner;
