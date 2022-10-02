from typing import Generator

from database import SessionLocal  # pyright: ignore
from services.suggestion import SuggestionService, get_service


def get_suggestion_service() -> Generator[SuggestionService, None, None]:
    with SessionLocal() as session:  # pyright: ignore
        try:
            yield get_service(session)  # pyright: ignore
        except Exception:
            session.rollback()  # pyright: ignore
        finally:
            session.close()  # pyright: ignore
