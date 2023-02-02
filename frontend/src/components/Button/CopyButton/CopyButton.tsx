import { IoCopy } from 'react-icons/io5';

import Button from '../Button';
import { CopyButtonProps } from './CopyButton.types';

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
    }

    return (
        <Button
            as="button"
            stylesFor="cell"
            title="Copiar contenido"
            onClick={handleCopy}
        >
            <IoCopy />
        </Button>
    )
}

export default CopyButton;