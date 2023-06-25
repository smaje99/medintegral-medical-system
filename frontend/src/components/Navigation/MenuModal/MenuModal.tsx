import Link from 'next/link';
import ReactModal from 'react-modal';

import Button from '@/components/Button';
import navigation from '@/helpers/navigation';
import routes from '@/helpers/routes';

import styles from './MenuModal.module.scss';

type Props = {
  isOpen: boolean;
  close: () => void;
};

const MenuModal: React.FC<Props> = ({ isOpen, close }) => {
  return (
    <ReactModal isOpen={isOpen} className={styles.modal} ariaHideApp={false}>
      <ul className={styles.menu}>
        {navigation.map(({ name, route }) => (
          <li key={name} className={styles.item}>
            <Link href={route}>
              <a className={styles.link} onClick={close}>
                {name}
              </a>
            </Link>
          </li>
        ))}

        <li className={styles.item}>
          <Button
            as='a'
            href={routes.login}
            stylesFor='floating'
            className={styles.login}
            onClick={close}
          >
            Iniciar sesión
          </Button>
        </li>
      </ul>
    </ReactModal>
  );
};

export default MenuModal;
