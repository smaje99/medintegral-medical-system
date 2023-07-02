from enum import StrEnum


class ServiceType(StrEnum):
    '''Enum of services type.'''

    IN_OF_IPS = 'presencial'
    OUT_OF_IPS = 'extramural'
