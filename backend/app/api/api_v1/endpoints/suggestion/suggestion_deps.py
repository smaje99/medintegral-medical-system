from typing import Generator

from app.database import SessionLocal  # pyright: ignore
from app.services.suggestion import SuggestionService, get_service


def get_suggestion_service() -> Generator[SuggestionService, None, None]:
    '''Generate and manage a db session for the suggestion service.

    Yields:
        Generator[SuggestionService, None, None]: A suggestion service with db session
    '''
    with SessionLocal() as session:  # pyright: ignore
        try:
            yield get_service(session)  # pyright: ignore
        except Exception:
            session.rollback()  # pyright: ignore
        finally:
            session.close()  # pyright: ignore
