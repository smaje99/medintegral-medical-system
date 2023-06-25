from abc import ABCMeta
from typing import Any, Generic

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.services.common.base.base import Base
from app.services.common.typings import ModelType, CreateSchemaType, UpdateSchemaType


class BaseCRUD(
    Base[ModelType],
    Generic[ModelType, CreateSchemaType, UpdateSchemaType],
    metaclass=ABCMeta,
):
    '''Base class for CRUD operations.

    Args:
        Generic ([ModelType, CreateSchemaType, UpdateSchemaType]): Models
        and schemes to be used in the operation of the service.
        Base: Base class to generate services.
        metaclass (ABCMeta): This class is abstract, it must not be implemented.
    '''

    def __init__(self, model: type[ModelType], database: Session):
        '''
        Base class for CRUD operations.

        Args:
            model (Type[ModelType]): A SQLAlchemy model class.
            database (Session): A database session instance.
        '''
        Base.__init__(self, model, database)

    def get(self, obj_id: Any) -> ModelType | None:
        '''Retrieve a record using the given id.

        Args:
            obj_id (Any): identifier of the record to be retrieved.

        Returns:
            ModelType: The record retrieved.
        '''
        return self.database.query(self.model).get(obj_id)

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
        obj_in_data = obj_in.dict()
        db_obj: ModelType = self.model(**obj_in_data)  # pyright: ignore

        self.database.add(db_obj)
        self.database.commit()
        self.database.refresh(db_obj)

        return db_obj

    def update(
        self, *, db_obj: ModelType, obj_in: UpdateSchemaType | dict[str, Any]
    ) -> ModelType:
        '''Update data of a record in the given model.

        Args:
            db_obj (ModelType): Current data recorded in the given model to be updated.
            obj_in (UpdateSchemaType | dict[str, Any]): Schema data to be updated in
            the given model.

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
            raise ValueError('No se puede actualizar el registro.') from error

        self.database.commit()
        self.database.refresh(db_obj)

        return db_obj

    def remove(self, obj_id: Any) -> ModelType:
        '''Delete a record in the given model.

        Args:
            obj_id (Any): identifier of the record to be deleted.

        Raises:
            ValueError: The record doesn't exist in the given model.

        Returns:
            ModelType: Data deleted in the given model.
        '''
        obj: ModelType | None = self.get(obj_id)

        if obj is None:
            raise ValueError('Registro no encontrado')

        self.database.delete(obj)
        self.database.commit()

        return obj
