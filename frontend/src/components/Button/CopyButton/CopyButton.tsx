import { IoCopy } from 'react-icons/io5';
import { toast } from 'react-toastify';

import getToastConfig from '@/helpers/toast.config';

import Button from '../Button';

interface Props {
  textToCopy: string;
}

const CopyButton: React.FC<Props> = ({ textToCopy }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    toast.info('Contenido copiado', getToastConfig());
  };

  return (
    <Button
      as='button'
      stylesFor='cell'
      title='Copiar contenido'
      onClick={handleCopy}
      style={{ cursor: 'copy' }}
    >
      <IoCopy />
    </Button>
  );
};

export default CopyButton;
