from enum import StrEnum


class Permission(StrEnum):
    '''Enum of permissions in the system.'''

    USERS = 'usuarios'
    SERVICES = 'servicios'
    DOCTORS = 'médicos'
    SPECIALTIES = 'especialidades'
    SUGGESTIONS = 'sugerencias'
    SERVICES_DOCTORS = 'servicios-médicos'
