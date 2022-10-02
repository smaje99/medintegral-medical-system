from abc import ABC
from typing import Any, Generic, Type, TypeVar

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Base  # pyright: ignore


ModelType = TypeVar('ModelType', bound=Base)
CreateSchemaType = TypeVar('CreateSchemaType', bound=BaseModel)
UpdateSchemaType = TypeVar('UpdateSchemaType', bound=BaseModel)


class BaseService(ABC, Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType], db: Session):
        '''
        Base class for all services by default as
        create, update, get, get all and delete

        Args:
            model (Type[ModelType]): A SQLAlchemy model class
            db (Session): A database session instance
        '''
        self.model: Type[ModelType] = model
        self.db: Session = db

    def get(self, id: Any) -> ModelType | None:
        return self.db.query(self.model).get(id)  # pyright: ignore

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[ModelType]:
        return (self.db
                .query(self.model)  # pyright: ignore
                .slice(skip, limit)
                .all())

    def create(self, obj_in: CreateSchemaType) -> ModelType:
        # sourcery skip: class-extract-method
        obj_in_data = jsonable_encoder(obj_in)
        db_obj: ModelType = self.model(**obj_in_data)

        self.db.add(db_obj)  # pyright: ignore
        self.db.commit()
        self.db.refresh(db_obj)  # pyright: ignore

        return db_obj

    def update(
        self,
        *,
        db_obj: ModelType,
        obj_in: UpdateSchemaType | dict[str, Any]
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)

        update_data = (
            obj_in
            if isinstance(obj_in, dict) else
            obj_in.dict(exclude_unset=True)
        )

        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])

        try:
            self.db.add(db_obj)  # pyright: ignore
        except Exception as e:
            raise ValueError(
                'No se puede actualizar el registro, no existe en la base de datos'
            ) from e

        self.db.commit()
        self.db.refresh(db_obj)  # pyright: ignore

        return db_obj

    def remove(self, id: int) -> ModelType:
        obj: ModelType | None = self.get(id)

        if obj is None:
            raise ValueError('Registro no encontrado')

        self.db.delete(obj)  # pyright: ignore
        self.db.commit()

        return obj  # pyright: ignore
