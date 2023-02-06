from enum import Enum


class RHFactor(str, Enum):
    '''Enum of RH factors.'''

    present = '+'  # pylint: disable=invalid-name
    absent = '-'  # pylint: disable=invalid-name
