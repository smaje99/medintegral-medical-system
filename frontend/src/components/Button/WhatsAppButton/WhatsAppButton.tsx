import { IoLogoWhatsapp } from 'react-icons/io';

import Button from '../Button';

export interface Props {
  phoneNumber: string;
}

const WhatsAppButton: React.FC<Props> = ({ phoneNumber }) => {
  return (
    <Button
      as='a'
      stylesFor='cell'
      title='Enviar un mensaje a WhatsApp'
      href={`https://wa.me/${phoneNumber.slice(1)}`}
      target='_blank'
    >
      <IoLogoWhatsapp />
    </Button>
  );
};

export default WhatsAppButton;
