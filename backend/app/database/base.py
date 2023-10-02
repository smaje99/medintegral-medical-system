from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass


class Base(AsyncAttrs, MappedAsDataclass, DeclarativeBase):
    '''Base class for all SQLAlchemy models.'''

    __name__: str

    @declared_attr
    def __tablename__(self) -> str:
        '''Generate __tablename__ automatically'''
        return self.__name__.lower()
