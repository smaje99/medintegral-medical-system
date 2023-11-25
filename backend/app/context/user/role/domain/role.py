from pydantic import BaseModel, ConfigDict

from app.context.user.role.domain.objects import RoleId


__all__ = ('Role',)


class Role(BaseModel):
  '''Role entity.'''

  id: RoleId
  name: str
  description: str

  model_config = ConfigDict(from_attributes=True)
