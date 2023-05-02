from typing import TypeVar

from pydantic import BaseModel

from app.database import Base


# Types hinting for the service.
ModelType = TypeVar('ModelType', bound=Base)  # pylint: disable=C0103
CreateSchemaType = TypeVar('CreateSchemaType', bound=BaseModel)  # pylint: disable=C0103
UpdateSchemaType = TypeVar('UpdateSchemaType', bound=BaseModel)  # pylint: disable=C0103
