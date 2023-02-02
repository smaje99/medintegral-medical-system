import { MdOutgoingMail } from 'react-icons/md';

import { EmailButtonProps } from './EmailButton.types';
import Button from '../Button';

const EmailButton = ({ email }: EmailButtonProps) => {
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