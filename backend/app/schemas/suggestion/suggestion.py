from datetime import datetime
from uuid import UUID

from fastapi_camelcase import CamelModel
from pydantic import Field, validator


class SuggestionBase(CamelModel):
    '''Shared properties.'''


class SuggestionCreate(SuggestionBase):
    '''Properties to receive on suggestion creation.'''

    opinion: str = Field(..., min_length=1, max_length=500)

    @validator('opinion', pre=True)
    def format_opinion(cls, value: str) -> str:  # pylint: disable=C0116, E0213
        return value.lower().strip()


class SuggestionUpdate(SuggestionBase):
    '''Properties to receive on suggestion update.'''


class SuggestionInDBBase(SuggestionBase):
    '''properties shared by models stored in the database.'''

    id: UUID
    opinion: str
    pinned: bool
    created_at: datetime

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Suggestion(SuggestionInDBBase):
    '''Properties to return to client.'''


class SuggestionInDB(SuggestionInDBBase):
    '''Properties stored in database.'''
