from typing import Any

from sqlalchemy import inspect, MetaData
from sqlalchemy.ext.declarative import as_declarative, declared_attr  # pyright: ignore


# A naming convention for the database constraints.
__convention: dict[str, str] = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

__metadata = MetaData(naming_convention=__convention)


@as_declarative(metadata=__metadata)  # pyright: ignore
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
