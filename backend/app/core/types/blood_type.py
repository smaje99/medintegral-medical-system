from enum import Enum


class BloodType(str, Enum):
    ''' Enum of Blood types. '''
    A = 'A'
    B = 'B'
    AB = 'AB'
    O = 'O'
