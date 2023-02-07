import { MdOutgoingMail } from 'react-icons/md';

import Button from '../Button';
import type { EmailButtonProps } from './EmailButton.types';

const EmailButton: React.FC<EmailButtonProps> = ({ email }) => {
    return (
        <Button
            as="a"
            stylesFor="cell"
            title="Enviar un correo electrónico"
            href={`mailto:${email}`}
            target="_blank"
        >
            <MdOutgoingMail />
        </Button>
    )
}

export default EmailButton;