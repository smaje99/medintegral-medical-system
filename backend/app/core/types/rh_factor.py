from enum import StrEnum


class RHFactor(StrEnum):
    '''Enum of RH factors.'''

    present = '+'  # pylint: disable=invalid-name
    absent = '-'  # pylint: disable=invalid-name
