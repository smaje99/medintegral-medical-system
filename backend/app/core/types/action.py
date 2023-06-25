from enum import StrEnum


class Action(StrEnum):
    '''Enum of type of the permission actions.'''

    CREATION = 'creación'
    READ = 'lectura'
    UPDATE = 'modificación'
    DISABLE = 'deshabilitar'
