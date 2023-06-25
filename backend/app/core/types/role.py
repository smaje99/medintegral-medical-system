from enum import StrEnum


class Role(StrEnum):
    '''Enum of some roles in the system.'''

    ADMIN = 'administrador'
    DOCTOR = 'médico'
    RECEPTIONIST = 'recepcionista'
    ADMINISTRATIVE = 'administrativo'
