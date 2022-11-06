from enum import Enum


class Gender(str, Enum):
    ''' Enum of genders. '''
    male = 'masculino'  # pylint: disable=invalid-name
    female = 'femenino'  # pylint: disable=invalid-name
