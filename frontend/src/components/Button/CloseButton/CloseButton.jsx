import styles from './CloseButton.module.scss';

const CloseButton = ({ onEvent }) => {
    return (
        <div className={styles.content} onClick={onEvent}>
            <button className={styles.button}></button>
        </div>
    )
}

export default CloseButton;