from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.context.user.user.domain.objects import UserId


__all__ = ('User',)


class User(BaseModel):
  '''User entity.'''

  id: UserId
  fullname: str
  username: str
  email: str
  hashed_password: str | None = None
  is_superuser: bool = False
  is_active: bool = True
  image: str | None = None
  role: str
  created_at: datetime
  modified_at: datetime

  model_config = ConfigDict(from_attributes=True)
