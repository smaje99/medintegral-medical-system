from pydantic import BaseModel

from app.context.user.role.domain.objects import RoleId
from app.context.user.user.domain.objects import UserUsername


__all__ = ('UserSaveDto',)


class UserSaveDto(BaseModel):
  '''User create DTO.'''

  username: UserUsername
  image: str | None = None
  role_id: RoleId
