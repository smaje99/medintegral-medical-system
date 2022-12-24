import { toast } from 'react-toastify';

import styles from '@Styles/toast.module.scss';


export default function getToastConfig(position = toast.POSITION.BOTTOM_RIGHT) {
    return {
        position,
        className: styles.toast,
        theme: "dark"
    } as const;
}

export const getToastUpdateConfig = {
    isLoading: false,
    autoClose: 8000,
    closeButton: null
} as const;