import { BsFillTelephoneForwardFill } from 'react-icons/bs';

import { TelButtonProps } from './TelButton.types';

import Button from '../Button';

const TelButton = ({number}: TelButtonProps) => {
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