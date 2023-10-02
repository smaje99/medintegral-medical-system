from pydantic import BaseModel, ConfigDict

from .objects import RoleId


class Role(BaseModel):
    '''Role model'''

    id: RoleId
    name: str
    description: str

    model_config = ConfigDict(from_attributes=True)
