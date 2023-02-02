export interface ModalProps extends ReactModal.Props {
    close: () => void;
    children: JSX.Element | JSX.Element[]
}