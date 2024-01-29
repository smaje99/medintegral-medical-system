from typing import Annotated

from pydantic import BeforeValidator


__all__ = ('PersonAge',)


def transform_person_age(age: str) -> str:
  '''Transform person's age.

  Args:
      age (str): Person's age.

  Returns:
      str: Transformed person's age.
  '''
  return (
    age.replace('years', 'años')
    .replace('mons', 'meses')
    .replace('days', 'días')
    .replace('year', 'año')
    .replace('mon', 'mes')
    .replace('day', 'día')
  )


PersonAge = Annotated[str, BeforeValidator(transform_person_age)]
'''Value object person's age.'''
