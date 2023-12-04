from pydantic import BaseModel, ConfigDict


__all__ = ('HealthResponse',)


class HealthResponse(BaseModel):
  '''DTO for the health response.'''

  database: bool
  '''Database connection.'''

  model_config = ConfigDict(from_attributes=True)
