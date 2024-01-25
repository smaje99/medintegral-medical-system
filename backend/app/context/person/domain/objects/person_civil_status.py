from typing import Annotated

from pydantic import BeforeValidator

from app.context.person.domain.enums import CivilStatus


__all__ = ('PersonCivilStatus',)


def validate_person_civil_status(civil_status: CivilStatus | str) -> CivilStatus:
  '''Validate person's civil status.

  Args:
      civil_status (Gender | str): Person's civil status

  Returns:
      Gender: Validated person's civil status.
  '''
  assert civil_status is not None, 'Estado civil de la persona es requerido.'
  assert civil_status in CivilStatus, 'Estado civil de la persona no es válido.'

  return CivilStatus(civil_status)


PersonCivilStatus = Annotated[CivilStatus, BeforeValidator(validate_person_civil_status)]
'''Value object person's civil status.'''
