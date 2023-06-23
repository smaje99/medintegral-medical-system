import { toast, UpdateOptions } from 'react-toastify';

import styles from '@/styles/toast.module.scss';

export default function getToastConfig(position = toast.POSITION.BOTTOM_RIGHT) {
  return {
    position,
    className: styles.toast,
    theme: 'dark',
  } as const;
}

export const getToastUpdateConfig = (
  type: UpdateOptions['type'],
  rest?: UpdateOptions
): UpdateOptions =>
  ({
    type,
    isLoading: false,
    autoClose: 8000,
    closeButton: null,
    ...rest,
  } as const);
