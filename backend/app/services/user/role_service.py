from sqlalchemy.orm import Session

from app.models.user import Role
from app.schemas.user.role import RoleCreate, RoleUpdate
from app.services import BaseService


class RoleService(BaseService[Role, RoleCreate, RoleUpdate]):
    '''Service that provides CRUD operations for a role model.

    Args:
        BaseService([Role, RoleCreate, RoleUpdate]): Models and schemas.
    '''
    @classmethod
    def get_service(cls, db: Session):  # pylint: disable=missing-function-docstring, invalid-name  # noqa: E501
        return cls(model=Role, db=db)
