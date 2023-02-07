import { IoLogoWhatsapp } from 'react-icons/io';

import Button from '../Button';
import type { WhatsAppButtonProps } from './WhatsAppButton.types';

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber }) => {
    return (
        <Button
            as="a"
            stylesFor="cell"
            title="Enviar un mensaje a WhatsApp"
            href={`https://wa.me/${phoneNumber.slice(1)}`}
            target="_blank"
        >
            <IoLogoWhatsapp />
        </Button>
    )
}

export default WhatsAppButton;