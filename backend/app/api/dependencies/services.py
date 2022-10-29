from typing import Generic, Generator, Type, TypeVar

from app.database import SessionLocal
from app.services import BaseService


# Service type hinting.
ServiceType = TypeVar('ServiceType', bound=BaseService)  # type: ignore


class ServiceDependency(Generic[ServiceType]):
    '''Generator and manager of a database session for a given service.

    Args:
        Generic ([ServiceType]): Service to be used.
    '''
    def __init__(self, service: Type[ServiceType]):
        '''Generate and manage of a database session for a given service.

        Args:
            service (Type[ServiceType]): Service to be managed. Must not be initialized.
        '''
        self.service = service

    def __call__(self) -> Generator[ServiceType, None, None]:
        '''Generate a database session for the given service.

        Yields:
            Generator[ServiceType, None, None]: A service initialized with database session.
        '''
        with SessionLocal() as session:  # pyright: ignore
            try:
                yield self.service.get_service(session)  # pyright: ignore
            except Exception:
                session.rollback()  # pyright: ignore
            finally:
                session.close()  # pyright: ignore
