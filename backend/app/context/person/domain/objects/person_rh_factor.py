from typing import Annotated

from pydantic import BeforeValidator

from app.context.person.domain.enums import RHFactor


__all__ = ('PersonRHFactor',)


def validate_person_rh_factor(rh_factor: RHFactor | str) -> RHFactor:
  '''Validate person's RH factor.

  Args:
      rh_factor (RHFactor | str): Person's RH factor

  Returns:
      RHFactor: Validated person's RH factor.
  '''
  assert rh_factor is not None, 'Factor RH de la persona es requerido.'
  assert rh_factor in RHFactor, 'Factor RH de la persona no es válido.'

  return RHFactor(rh_factor)


PersonRHFactor = Annotated[RHFactor, BeforeValidator(validate_person_rh_factor)]
'''Value object person's RH factor.'''
