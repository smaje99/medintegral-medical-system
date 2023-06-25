from abc import ABCMeta, abstractmethod
from typing import Self

from sqlalchemy.orm import Session

from app.services.common.base import BaseContain, BaseCRUD
from app.services.common.typings import ModelType, CreateSchemaType, UpdateSchemaType


class BaseService(
    BaseContain[ModelType],
    BaseCRUD[ModelType, CreateSchemaType, UpdateSchemaType],
    metaclass=ABCMeta,
):
    '''Base class for all services by default as
    create, update, get, get all and delete

    Args:
        Generic ([ModelType, CreateSchemaType, UpdateSchemaType]): Models and schemes
        to be used in the operation of the service.
        metaclass (ABCMeta): This class is abstract, it must not be implemented.
    '''

    def __init__(self, model: type[ModelType], database: Session):
        '''
        Base class for all services by default as
        create, update, get, get all and delete.

        Args:
            model (Type[ModelType]): A SQLAlchemy model class.
            db (Session): A database session instance.
        '''
        BaseContain.__init__(self, model, database)
        BaseCRUD.__init__(self, model, database)

    @classmethod
    @abstractmethod
    def get_service(cls, database: Session) -> Self:
        '''Retrieve a service instance

        Args:
            db (Session): Database session to be used by the service.

        Returns:
            BaseService: Service initialized.
        '''
