import ReactModal from 'react-modal';

import { CloseButton } from '@Components/Button';

import { ModalProps } from './Modal.types';

import styles from './Modal.module.scss';

const Modal = ({ close, children, ...props }: ModalProps) => {
    return (
        <ReactModal
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
            onRequestClose={close}
            {...props}
        >
            <CloseButton onEvent={close} />
            {children}
        </ReactModal>
    )
}

export default Modal;