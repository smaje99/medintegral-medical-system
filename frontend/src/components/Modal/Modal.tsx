import ReactModal, { type Props as ReactModalProps } from 'react-modal';

import { CloseButton } from '@/components/Button';

import styles from './Modal.module.scss';

type Props = ReactModalProps & {
  close: () => void;
  children: React.JSX.Element | React.JSX.Element[];
};

const Modal: React.FC<Props> = ({ close, children, ...props }) => {
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
  );
};

export default Modal;
