import styles from './RightCell.module.scss';

type Props = {
  children: React.ReactNode;
};

const RightCell: React.FC<Props> = ({ children }) => {
  return <span className={styles.number}>{children}</span>;
};

export default RightCell;
