import { toast } from 'react-toastify';

import styles from '@Styles/toast.module.scss';


export default function getToastConfig(position = toast.POSITION.BOTTOM_RIGHT) {
    return {
        position,
        className: styles.toast,
        theme: "dark"
    }
}