from uuid import UUID

from sqlalchemy import desc, update
from sqlalchemy.exc import InternalError
from sqlalchemy.orm import Session

from core.exceptions import PinnedSuggestionException
from models.suggestion import Suggestion
from schemas.suggestion import SuggestionCreate, SuggestionUpdate
from services import BaseService

class SuggestionService(BaseService[Suggestion, SuggestionCreate, SuggestionUpdate]):
    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[Suggestion]:
        return (self.db
                .query(self.model)  # pyright: ignore
                .order_by(desc(self.model.created_at))
                .slice(skip, limit)
                .all())

    def modify_pinned(self, id: UUID, pinned: bool) -> Suggestion:
        stmt = (update(self.model)  # type: ignore
                .where(self.model.id == id)  # pyright: ignore
                .values(pinned=pinned))

        try:
            self.db.execute(stmt)  # pyright: ignore
            self.db.commit()
        except InternalError as e:
            raise PinnedSuggestionException(e) from e

        return self.get(id)


def get_service(db: Session) -> SuggestionService:
    return SuggestionService(model=Suggestion, db=db)
