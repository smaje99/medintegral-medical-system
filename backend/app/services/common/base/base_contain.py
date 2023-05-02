from abc import ABCMeta
from typing import Any

from sqlalchemy.orm import Session
from sqlalchemy.inspection import inspect

from app.services.common.base.base import Base
from app.services.common.typings import ModelType


class BaseContain(Base[ModelType], metaclass=ABCMeta):
    '''Base class for the operation of containing a record of the given model.

    Args:
        Base: Base class to generate services.
        metaclass (ABCMeta): This class is abstract, it must not be implemented.
    '''

    def __init__(self, model: type[ModelType], database: Session):
        '''Base class for the operation of containing a record of the given model.

        Args:
            model (Type[ModelType]): A SQLAlchemy model class.
            database (Session): A database session instance.
        '''
        Base.__init__(self, model, database)

    def contains(self, obj_id: Any) -> bool:
        '''Checks if the model contains the given id.

        Args:
            obj_id (int): The ID of the model to check for.
        Returns:
            bool: True if the model exists, False otherwise.
        '''
        model_id = inspect(self.model).primary_key[0]
        query = self.database.query(self.model).filter(model_id == obj_id)
        return self.database.query(query.exists()).scalar()
