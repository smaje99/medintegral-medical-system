from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

from app.context.user.role.domain.objects import RoleId
from app.context.user.user.domain.objects import UserId
from app.core.generators import generate_password


__all__ = ('UserSaveDto',)


class UserSaveDto(BaseModel):
  '''User create DTO.'''

  model_config = ConfigDict(alias_generator=to_camel)

  id: UserId
  image: str | None = None
  role_id: RoleId
  password: str = Field(generate_password(), exclude=True, frozen=True)
