import { AiFillEdit } from 'react-icons/ai';

import Button from '../Button';

interface Props {
  onEdit: () => void;
}

const EditButton: React.FC<Props> = ({ onEdit }) => (
  <Button as='button' stylesFor='cell' title='Modificar contenido' onClick={onEdit}>
    <AiFillEdit />
  </Button>
);

export default EditButton;
