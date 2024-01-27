from typing import Self, final, override

from app.context.person.domain.objects import PersonId
from app.context.shared.domain.errors import ResourceAlreadyExists


@final
class PersonAlreadyExists(ResourceAlreadyExists):
  '''Person already exists error class.'''

  @classmethod
  @override
  def from_id(cls, obj_id: PersonId) -> Self:
    '''Person with ID already exists error factory.

    Args:
        obj_id (PersonId): Person ID.

    Returns:
        Self: PersonAlreadyExists error.
    '''
    formatted_person_id = f'{obj_id:,}'.replace(',', '.')
    return cls(
      f'La persona con el número de identificación {formatted_person_id} ya existe'
    )
