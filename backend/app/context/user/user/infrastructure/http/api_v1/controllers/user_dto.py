from pydantic import BaseModel, ConfigDict


__all__ = ('UserPostResponse',)


class UserPostResponse(BaseModel):
  '''User Post Response DTO.'''

  id: str
  fullname: str
  username: str
  email: str
  image: str | None = None
  role: str

  model_config = ConfigDict(from_attributes=True)
