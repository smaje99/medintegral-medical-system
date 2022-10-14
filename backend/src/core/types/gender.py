from enum import Enum


class Gender(str, Enum):
    ''' Enum of genders. '''
    male = 'masculino'
    female = 'femenino'
