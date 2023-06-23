import { BsFillTelephoneForwardFill } from 'react-icons/bs';

import Button from '../Button';

interface Props {
  number: string;
}

const TelButton: React.FC<Props> = ({ number }) => {
  return (
    <Button as='a' stylesFor='cell' title='Llamar al celular' href={`tel:${number}`}>
      <BsFillTelephoneForwardFill />
    </Button>
  );
};

export default TelButton;
