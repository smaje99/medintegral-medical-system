import { MdOutgoingMail } from 'react-icons/md';

import Button from '../Button';

interface Props {
  email: string;
}

const EmailButton: React.FC<Props> = ({ email }) => {
  return (
    <Button
      as='a'
      stylesFor='cell'
      title='Enviar un correo electrónico'
      href={`mailto:${email}`}
      target='_blank'
    >
      <MdOutgoingMail />
    </Button>
  );
};

export default EmailButton;
