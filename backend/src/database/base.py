from typing import Any

from sqlalchemy import inspect
from sqlalchemy.ext.declarative import as_declarative, declared_attr  # pyright: ignore


@as_declarative()  # pyright: ignore
class Base:
    __name__: str

    @declared_attr
    def __tablename__(self) -> str:
        ''' Generate __tablename__ automatically '''
        return self.__name__.lower()

    def _asdict(self) -> dict[str, Any]:
        ''' Convierte el modelo de la tabla de la tabla a un dict '''
        return {
            obj.key: getattr(self, obj.key)
            for obj in inspect(self).mapper.column_attrs
        }
