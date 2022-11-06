from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field, validator


class SuggestionBase(BaseModel):
    ''' Shared properties. '''


class SuggestionCreate(SuggestionBase):
    ''' Properties to receive on suggestion creation. '''
    opinion: str = Field(..., min_length=1, max_length=500)

    @validator('opinion', pre=True)
    def format_opinion(cls, value: str) -> str:  # pylint: disable=no-self-argument missing-function-docstring  # noqa: E501
        return value.lower().strip()


class SuggestionUpdate(SuggestionBase):
    ''' Properties to receive on suggestion update. '''


class SuggestionInDBBase(SuggestionBase):
    ''' properties shared by models stored in the database. '''
    id: UUID
    opinion: str
    pinned: bool
    created_at: datetime

    class Config:  # pyright: ignore  # pylint: disable=missing-class-docstring
        orm_mode = True


class Suggestion(SuggestionInDBBase):
    ''' Properties to return to client. '''


class SuggestionInDB(SuggestionInDBBase):
    ''' Properties stored in database.'''
