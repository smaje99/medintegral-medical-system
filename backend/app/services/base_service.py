from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, Generic, Type, TypeVar

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import Base


# Types hinting for the service.
ModelType = TypeVar('ModelType', bound=Base)  # pylint: disable=C0103
CreateSchemaType = TypeVar('CreateSchemaType', bound=BaseModel)  # pylint: disable=C0103
UpdateSchemaType = TypeVar('UpdateSchemaType', bound=BaseModel)  # pylint: disable=C0103


class BaseService(ABC, Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    '''Base class for all services by default as
    create, update, get, get all and delete

    Args:
        ABC: This class is abstract, it must not be implemented.
        Generic ([ModelType, CreateSchemaType, UpdateSchemaType]):
        Models and schemes
        to be used in the operation of the service.
    '''

    def __init__(self, model: Type[ModelType], database: Session):
        '''
        Base class for all services by default as
        create, update, get, get all and delete.

        Args:
            model (Type[ModelType]): A SQLAlchemy model class.
            db (Session): A database session instance.
        '''
        self.model: Type[ModelType] = model
        self.database: Session = database

    @classmethod
    @abstractmethod
    def get_service(
        cls: Type[BaseService[ModelType, CreateSchemaType, UpdateSchemaType]],
        database: Session,
    ) -> BaseService[ModelType, CreateSchemaType, UpdateSchemaType]:
        '''Retrieve a service instance

        Args:
            db (Session): Database session to be used by the service.

        Returns:
            BaseService: Service initialized.
        '''

    def get(self, id: Any) -> ModelType | None:  # pylint: disable=C0103, W0622
        """Retrieve a record using the given id.

        Args:
            id (Any): identifier of the record to be retrieved.

        Returns:
            ModelType: The record retrieved.
        """
        return self.database.query(self.model).get(id)

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[ModelType]:
        '''Retrieve a list of the records.

        Args:
            skip (int): Start cut of subset of records. Defaults to 0.
            limit (int): Number of records within the subset. Defaults to 50.

        Returns:
            list[ModelType]: A list of record subset.
        '''
        return self.database.query(self.model).slice(skip, limit).all()

    def create(self, obj_in: CreateSchemaType) -> ModelType:
        '''Create a new record within the given model.

        Args:
            obj_in (CreateSchemaType): Schema data to be recorded
            in the given model.

        Returns:
            ModelType: Data recorded in the given model.
        '''
        # sourcery skip: class-extract-method
        obj_in_data = jsonable_encoder(obj_in)
        db_obj: ModelType = self.model(**obj_in_data)

        self.database.add(db_obj)
        self.database.commit()
        self.database.refresh(db_obj)

        return db_obj

    def update(
        self, *, db_obj: ModelType, obj_in: UpdateSchemaType | dict[str, Any]
    ) -> ModelType:
        '''Update data of a record in the given model.

        Args:
            db_obj (ModelType): Current data recorded in the given model
            to be updated.
            obj_in (UpdateSchemaType | dict[str, Any]): Schema data
            to be updated in the given model.

        Raises:
            ValueError: The record doesn't exist in the given model.

        Returns:
            ModelType: Data updated in the given model.
        '''
        obj_data = jsonable_encoder(db_obj)

        update_data = (
            obj_in if isinstance(obj_in, dict) else obj_in.dict(exclude_unset=True)
        )

        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])

        try:
            self.database.add(db_obj)
        except Exception as error:
            raise ValueError(
                'No se puede actualizar el registro, no existe en la base de datos'
            ) from error

        self.database.commit()
        self.database.refresh(db_obj)

        return db_obj

    def remove(self, id: Any) -> ModelType:  # pylint: disable=C0103, W0622
        '''Delete a record in the given model.

        Args:
            id (Any): identifier of the record to be deleted.

        Raises:
            ValueError: The record doesn't exist in the given model.

        Returns:
            ModelType: Data deleted in the given model.
        '''
        obj: ModelType | None = self.get(id)

        if obj is None:
            raise ValueError('Registro no encontrado')

        self.database.delete(obj)
        self.database.commit()

        return obj
