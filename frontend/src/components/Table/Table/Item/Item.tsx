import { useSession } from 'next-auth/react';

import { Search, type SearchProps } from '@/components/Input';
import { Actions } from '@/helpers/permissions';
import { hasPermission } from '@/utils/auth';

import { usePermission, useTable } from '../hooks';
import styles from './Item.module.scss';

type PropsBase = {
  readonly itemType: 'button' | 'search';
  readonly canView?: boolean | ((rowSelectionSize: number) => boolean);
  readonly action?: Actions;
  readonly children?: React.ReactNode;
};

type ReactButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type PropsButton = PropsBase & {
  readonly itemType: 'button';
  readonly disableButtonStyle?: boolean;
} & ReactButtonProps;

type PropsSearch = PropsBase & {
  readonly itemType: 'search';
} & SearchProps;

type Props = PropsButton | PropsSearch;

const Item: React.FC<Props> = ({
  itemType,
  canView = true,
  action = undefined,
  children,
  ...props
}) => {
  const { data: session } = useSession();
  const { rowSelectionSize } = useTable<object>();
  const { permission } = usePermission();

  if (typeof canView === 'boolean' ? canView : canView(rowSelectionSize)) {
    if (itemType === 'button' && hasPermission(session, permission, action)) {
      return (
        <li className={styles.item}>
          <button
            className={
              (props as PropsButton).disableButtonStyle
                ? styles['button--disable']
                : styles.button
            }
            {...(props as ReactButtonProps)}
          >
            {children}
          </button>
        </li>
      );
    }

    if (itemType === 'search') {
      return (
        <li className={styles.item}>
          <Search {...(props as SearchProps)} />
        </li>
      );
    }
  }

  return null;
};

export default Item;
