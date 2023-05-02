from enum import StrEnum


class PermissionAction(StrEnum):
    '''Enum of type of the permission actions.'''

    creation = 'creación'  # pylint: disable=invalid-name
    read = 'lectura'  # pylint: disable=invalid-name
    update = 'modificación'  # pylint: disable=invalid-name
    disable = 'deshabilitar'  # pylint: disable=invalid-name
