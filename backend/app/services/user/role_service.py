from uuid import UUID

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

    def contains(self, role_id: UUID) -> bool:
        '''Checks if the role model contains the given id.

        Args:
            id (UUID): The ID of the role to check for.

        Returns:
            bool: True if the role exists, False otherwise.
        '''
        query = self.db.query(Role).filter(Role.id == role_id)
        return (self.db
                .query(query.exists())
                .scalar())
