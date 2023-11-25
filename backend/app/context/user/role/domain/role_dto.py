from pydantic import BaseModel

from app.context.user.role.domain.objects import RoleDescription, RoleName


__all__ = ('RoleSaveDTO',)


class RoleSaveDTO(BaseModel):
  '''Role create DTO.'''

  name: RoleName
  description: RoleDescription
