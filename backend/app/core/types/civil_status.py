from enum import Enum


class CivilStatus(str, Enum):
    '''Enum of Civil status.'''

    single = 'soltero'  # pylint: disable=invalid-name
    married = 'casado'  # pylint: disable=invalid-name
    divorced = 'divorciado'  # pylint: disable=invalid-name
    widower = 'viudo'  # pylint: disable=invalid-name
    union = 'unión marital'  # pylint: disable=invalid-name
