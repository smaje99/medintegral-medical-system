from uuid import UUID

from sqlalchemy import desc, update
from sqlalchemy.exc import InternalError
from sqlalchemy.orm import Session
from sqlalchemy.sql import expression

from app.core.exceptions import DatabaseException
from app.models.suggestion import Suggestion
from app.schemas.suggestion.suggestion import (
    SuggestionCreate,
    SuggestionUpdate
)
from app.services import BaseService


# This class is a service that provides CRUD operations for a suggestion model
class SuggestionService(
    BaseService[Suggestion, SuggestionCreate, SuggestionUpdate]
):
    '''Service that provides CRUD operations for a suggestion model.

    Args:
        BaseService ([Suggestion, SuggestionCreate, SuggestionUpdate]):
        Models and schemas.
    '''

    @classmethod
    def get_service(cls, db: Session):  # pylint: disable=missing-function-docstring, invalid-name  # noqa: E501
        return cls(model=Suggestion, db=db)

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[Suggestion]:
        '''Retrieves a list of suggestions sorted by creation date.

        Args:
            skip (int): Start cut of subset of suggestions. Defaults to 0.
            limit (int): Number of suggestions within the subset.
            Defaults to 50.

        Returns:
            list[Suggestion]: A list of suggestion subset.
        '''
        return (self.db
                .query(self.model)  # pyright: ignore
                .order_by(desc(self.model.created_at))
                .slice(skip, limit)
                .all())

    def get_all_pinned(self) -> list[Suggestion]:
        '''Retrieves a list of pinned suggestions sorted by creation date.

        Returns:
            list[Suggestion]: A list of pinned suggestions.
        '''
        return (self.db
                .query(self.model)
                .filter(self.model.pinned == expression.true())
                .order_by(desc(self.model.created_at))
                .all())

    def modify_pinned(self, id: UUID, pinned: bool) -> Suggestion:  # pylint: disable=invalid-name, redefined-builtin  # noqa: E501
        '''Modify the pinning of a suggestion given an ID.
        There can only be three pinned suggestions.

        Args:
            id (UUID): Given ID of a suggestion to pin
            pinned (bool): Pinned state for suggestion

        Raises:
            DatabaseException: There are more than three pinned suggestions.

        Returns:
            Suggestion: Suggestion with modified pinned.
        '''
        stmt = (update(self.model)  # type: ignore
                .where(self.model.id == id)  # pyright: ignore
                .values(pinned=pinned))

        try:
            self.db.execute(stmt)  # pyright: ignore
            self.db.commit()
        except InternalError as error:
            raise DatabaseException(error) from error

        return self.get(id)  # type: ignore
