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
    def get_service(cls, database: Session):
        return cls(model=Role, database=database)

    def contains(self, role_id: UUID) -> bool:
        '''Checks if the role model contains the given id.

        Args:
            id (UUID): The ID of the role to check for.

        Returns:
            bool: True if the role exists, False otherwise.
        '''
        query = self.database.query(Role).filter(Role.id == role_id)
        return self.database.query(query.exists()).scalar()
