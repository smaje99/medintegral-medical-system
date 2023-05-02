from abc import ABCMeta
from typing import Generic

from sqlalchemy.orm import Session

from app.services.common.typings import ModelType


class Base(Generic[ModelType], metaclass=ABCMeta):
    '''Base class to generate services.

    Args:
        Generic ([ModelType]): Models to be used in the service operations.
        metaclass (ABCMeta): This class is abstract, it must not be implemented.
    '''

    def __init__(self, model: type[ModelType], database: Session):
        '''Base class to generate services.

        Args:
            model (Type[ModelType]): A SQLAlchemy model class.
            database (Session): A database session instance.
        '''
        self.model = model
        self.database = database
