from pydantic import BaseModel, Field

from app.context.user.role.domain.objects import RoleId
from app.context.user.user.domain.objects import UserId
from app.core.generators import generate_password


__all__ = ('UserSaveDto',)


class UserSaveDto(BaseModel):
  '''User create DTO.'''

  id: UserId
  password: str = Field(generate_password(), exclude=True, frozen=True)
  image: str | None = None
  role_id: RoleId = Field(alias='roleId')
