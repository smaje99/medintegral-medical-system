from datetime import date, timedelta
from typing import Annotated, Final

from dateutil.relativedelta import relativedelta
from pydantic import BeforeValidator


__all__ = ('PersonBirthdate', 'ensure_person_age_is_of_legal_age',)


INVALID_BIRTHDATE_MESSAGE: Final[str] = 'Fecha de nacimiento de la persona no es válida.'
YEAR_MIN: Final[int] = 1900


def validate_person_birthdate(birthdate: str | date) -> date:
  """Validate person's birthdate.

  Args:
      birthdate (str | date): Person's birthdate.

  Raises:
      AssertionError: If birthdate is not valid.

  Returns:
      date: Validated birthdate.
  """
  assert birthdate is not None, 'Fecha de nacimiento de la persona es requerida.'
  assert isinstance(birthdate, (str, date)), INVALID_BIRTHDATE_MESSAGE

  try:
    aux = date.fromisoformat(birthdate) if isinstance(birthdate, str) else birthdate
  except ValueError as error:
    raise AssertionError(INVALID_BIRTHDATE_MESSAGE) from error

  tomorrow = date.today() + timedelta(days=1)

  assert aux.year >= YEAR_MIN and aux < tomorrow, INVALID_BIRTHDATE_MESSAGE

  return aux


PersonBirthdate = Annotated[date, BeforeValidator(validate_person_birthdate)]
'''Value object person's birthdate.'''


LEGAL_AGE: Final[int] = 18


def ensure_person_age_is_of_legal_age(birthdate: date) -> bool:
  """Ensure person's age is greater than eighteen years old.

  Args:
      birthdate (date): Person's birthdate.

  Returns:
      bool: True if person's age is greater than eighteen years old.
  """
  age = relativedelta(date.today(), birthdate)

  return age.years >= LEGAL_AGE
