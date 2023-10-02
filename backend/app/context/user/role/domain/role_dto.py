from pydantic import BaseModel

from .objects import RoleName, RoleDescription


class RoleSaveDTO(BaseModel):
    '''Role create DTO'''

    name: RoleName
    description: RoleDescription
