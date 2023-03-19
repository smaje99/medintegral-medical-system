from enum import Enum


class ServiceType(str, Enum):
    '''Enum of services type.'''

    in_of_IPS = 'presencial'  # pylint: disable=invalid-name
    out_of_IPS = 'extramural'  # pylint: disable=invalid-name
