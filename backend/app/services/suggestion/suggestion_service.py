from uuid import UUID

from sqlalchemy import desc, update
from sqlalchemy.exc import InternalError
from sqlalchemy.orm import Session

from app.core.exceptions import PinnedSuggestionException
from app.models.suggestion import Suggestion
from app.schemas.suggestion import SuggestionCreate, SuggestionUpdate
from app.services import BaseService

# This class is a service that provides CRUD operations for a suggestion model
class SuggestionService(BaseService[Suggestion, SuggestionCreate, SuggestionUpdate]):
    '''Service that provides CRUD operations for a suggestion model.

    Args:
        BaseService ([Suggestion, SuggestionCreate, SuggestionUpdate]): Models and schemas
    '''

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[Suggestion]:
        '''Retrieves a list of suggestions sorted by creation date.

        Args:
            skip (int): Start cut of subset of suggestions. Defaults to 0.
            limit (int): Number of suggestions within the subset. Defaults to 50.

        Returns:
            list[ModelType]: A list of suggestion subset.
        '''
        return (self.db
                .query(self.model)  # pyright: ignore
                .order_by(desc(self.model.created_at))
                .slice(skip, limit)
                .all())

    def modify_pinned(self, id: UUID, pinned: bool) -> Suggestion:
        '''Modify the pinning of a suggestion given an ID.
        There can only be three pinned suggestions.

        Args:
            id (UUID): Given ID of a suggestion to pin
            pinned (bool): Pinned state for suggestion

        Raises:
            PinnedSuggestionException: There are more than three pinned suggestions.

        Returns:
            Suggestion: Suggestion with modified pinned.
        '''
        stmt = (update(self.model)  # type: ignore
                .where(self.model.id == id)  # pyright: ignore
                .values(pinned=pinned))

        try:
            self.db.execute(stmt)  # pyright: ignore
            self.db.commit()
        except InternalError as e:
            raise PinnedSuggestionException(e) from e

        return self.get(id)  # type: ignore


def get_service(db: Session) -> SuggestionService:
    '''Retrieve a suggestion service instance

    Args:
        db (Session): Database session to be used by the service

    Returns:
        SuggestionService: Suggestion service initialized.
    '''
    return SuggestionService(model=Suggestion, db=db)
