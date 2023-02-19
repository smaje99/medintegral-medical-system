import { AiFillEdit } from 'react-icons/ai';

import Button from '../Button';
import type { EditButtonProps } from './EditButton.types';

const EditButton: React.FC<EditButtonProps> = ({ onEdit }) =>  (
    <Button
        as="button"
        stylesFor="cell"
        title="Modificar contenido"
        onClick={onEdit}
    >
        <AiFillEdit />
    </Button>
)

export default EditButton;