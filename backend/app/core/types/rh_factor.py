from enum import Enum


class RHFactor(str, Enum):
    ''' Enum of RH factors. '''
    present = '+'
    absent = '-'
