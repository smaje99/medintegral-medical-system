import { IoLogoWhatsapp } from 'react-icons/io';

import { WhatsAppButtonProps } from './WhatsAppButton.types';

import Button from '../Button';

const WhatsAppButton = ({number}: WhatsAppButtonProps) => {
    return (
        <Button
            as="a"
            stylesFor="cell"
            title="Enviar un mensaje a WhatsApp"
            href={`https://wa.me/${number.slice(1)}`}
            target="_blank"
        >
            <IoLogoWhatsapp />
        </Button>
    )
}

export default WhatsAppButton;