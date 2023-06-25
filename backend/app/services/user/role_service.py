from sqlalchemy.orm import Session

from app.models.user import Role
from app.schemas.user.role import RoleCreate, RoleUpdate
from app.services.common.base import BaseService


class RoleService(BaseService[Role, RoleCreate, RoleUpdate]):
    '''Service that provides CRUD operations for a role model.

    Args:
        BaseService([Role, RoleCreate, RoleUpdate]): Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: Session):
        return cls(model=Role, database=database)
