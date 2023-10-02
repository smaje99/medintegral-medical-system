from app.context.shared.infrastructure.persistence.sqlalchemy import OrmDao

from .orm_role_entity import Role


class OrmRoleDao(OrmDao[Role]):
    '''SQLAlchemy ORM implementation of ORM DAO.'''

    def __new__(cls, *args, **kwargs):
        instance = super().__new__(cls)
        instance.__entity = Role

        return instance
