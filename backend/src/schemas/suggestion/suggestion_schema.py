from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


# Shared properties
class SuggestionBase(BaseModel):
    pass


# Properties to receive on suggestion creation
class SuggestionCreate(SuggestionBase):
    opinion: str = Field(..., min_length=1, max_length=500)


# Properties to receive on suggestion update
class SuggestionUpdate(SuggestionBase):
    pass


# properties shared by models stored in the database
class SuggestionInDBBase(SuggestionBase):
    id: UUID
    opinion: str
    pinned: bool
    created_at: datetime

    class Config:  # pyright: ignore
        orm_mode = True


# Properties to return to client
class Suggestion(SuggestionInDBBase):
    pass


# Properties stored in database
class SuggestionInDB(SuggestionInDBBase):
    pass
