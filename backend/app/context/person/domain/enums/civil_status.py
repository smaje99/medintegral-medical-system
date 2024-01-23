from enum import StrEnum


class CivilStatus(StrEnum):
  '''Enum of Civil status.'''

  SINGLE = 'soltero'
  MARRIED = 'casado'
  DIVORCED = 'divorciado'
  WIDOWED = 'viudo'
  MARITAL_UNION = 'unión marital'
