from enum import Enum


class Session(str, Enum):
    '''Enum of Session.'''

    morning = 'mañana'  # pylint: disable=invalid-name
    afternoon = 'tarde'  # pylint: disable=invalid-name
    full_day = 'todo el día'  # pylint: disable=invalid-name
