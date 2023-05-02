from typing import Generic, Generator, Type, TypeVar

from sqlalchemy.exc import SQLAlchemyError

from app.database import SessionLocal
from app.services.common.base import BaseService


# Service type hinting.
ServiceType = TypeVar('ServiceType', bound=BaseService)  # pylint: disable=C0103


class ServiceDependency(Generic[ServiceType]):
    '''Generator and manager of a database session for a given service.

    Args:
        Generic ([ServiceType]): Service to be used.
    '''

    def __init__(self, service: Type[ServiceType]):
        '''Generate and manage of a database session for a given service.

        Args:
            service (Type[ServiceType]): Service to be managed.
            Must not be initialized.
        '''
        self.service = service

    def __call__(self) -> Generator[ServiceType, None, None]:
        '''Generate a database session for the given service.

        Yields:
            Generator[ServiceType, None, None]: A service initialized with
            database session.
        '''
        with SessionLocal() as session:
            try:
                yield self.service.get_service(session)
            except SQLAlchemyError:
                session.rollback()
            finally:
                session.close()
