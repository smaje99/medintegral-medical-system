import { BsFillTelephoneForwardFill } from 'react-icons/bs';

import Button from '../Button';
import type { TelButtonProps } from './TelButton.types';

const TelButton: React.FC<TelButtonProps> = ({ number }) => {
    return (
        <Button
            as="a"
            stylesFor="cell"
            title="Llamar al celular"
            href={`tel:${number}`}
        >
            <BsFillTelephoneForwardFill />
        </Button>
    )
}

export default TelButton;