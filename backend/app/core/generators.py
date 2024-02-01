import secrets
import string
from typing import Final


__all__ = ('generate_password',)


ALPHABET: Final[str] = string.ascii_letters + string.digits


def generate_password(*, length: int = 10, number_of_digits: int = 2) -> str:
  '''Generate a password.

  Args:
      length (int, optional): Password length Defaults to 10.
      number_of_digits (int, optional): Number of digits in password. Defaults to 2.

  Returns:
      str: A new password.
  '''
  while True:
    password = ''.join(secrets.choice(ALPHABET) for _ in range(length))
    if (
      any(c.islower() for c in password)
      and any(c.isupper() for c in password)
      and sum(c.isdigit() for c in password) >= number_of_digits
    ):
      return password
