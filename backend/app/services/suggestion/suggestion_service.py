from uuid import UUID

from sqlalchemy import desc, update
from sqlalchemy.exc import InternalError
from sqlalchemy.orm import Session
from sqlalchemy.sql import expression

from app.core.exceptions import DatabaseException
from app.models.suggestion import Suggestion
from app.schemas.suggestion.suggestion import SuggestionCreate, SuggestionUpdate
from app.services import BaseService


# This class is a service that provides CRUD operations for a suggestion model
class SuggestionService(BaseService[Suggestion, SuggestionCreate, SuggestionUpdate]):
    '''Service that provides CRUD operations for a suggestion model.

    Args:
        BaseService ([Suggestion, SuggestionCreate, SuggestionUpdate]):
        Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: Session):
        return cls(model=Suggestion, database=database)

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[Suggestion]:
        '''Retrieves a list of suggestions sorted by creation date.

        Args:
            skip (int): Start cut of subset of suggestions. Defaults to 0.
            limit (int): Number of suggestions within the subset.
            Defaults to 50.

        Returns:
            list[Suggestion]: A list of suggestion subset.
        '''
        return (
            self.database.query(self.model)
            .order_by(desc(self.model.created_at))
            .slice(skip, limit)
            .all()
        )

    def get_all_pinned(self) -> list[Suggestion]:
        '''Retrieves a list of pinned suggestions sorted by creation date.

        Returns:
            list[Suggestion]: A list of pinned suggestions.
        '''
        return (
            self.database.query(self.model)
            .filter(self.model.pinned == expression.true())
            .order_by(desc(self.model.created_at))
            .all()
        )

    def modify_pinned(
        self, id: UUID, pinned: bool  # pylint: disable=C0103, W0622
    ) -> Suggestion | None:
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
        stmt = (
            update(self.model)  # type: ignore
            .where(self.model.id == id)
            .values(pinned=pinned)
        )

        try:
            self.database.execute(stmt)
            self.database.commit()
        except InternalError as error:
            raise DatabaseException(error) from error

        return self.get(id)
