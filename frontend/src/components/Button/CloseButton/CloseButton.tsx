import styles from './CloseButton.module.scss';

interface Props {
  onEvent: () => void;
}

const CloseButton: React.FC<Props> = ({ onEvent }) => {
  return (
    <div className={styles.content} onClick={onEvent}>
      <button className={styles.button}></button>
    </div>
  );
};

export default CloseButton;
