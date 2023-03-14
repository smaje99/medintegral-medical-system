import { IoCopy } from 'react-icons/io5';
import { toast } from 'react-toastify';

import getToastConfig from '@Helpers/toast.config';

import Button from '../Button';
import type { CopyButtonProps } from './CopyButton.types';

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(textToCopy);
        toast.info('Contenido copiado', getToastConfig())
    }

    return (
        <Button
            as="button"
            stylesFor="cell"
            title="Copiar contenido"
            onClick={handleCopy}
            style={{ cursor: 'copy' }}
        >
            <IoCopy />
        </Button>
    )
}

export default CopyButton;