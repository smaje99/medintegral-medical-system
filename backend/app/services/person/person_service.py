from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.models.person import Person
from app.schemas.person.person import PersonCreate, PersonUpdate
from app.services import BaseService


class PersonService(BaseService[Person, PersonCreate, PersonUpdate]):
    '''Service that provides CRUD operations and authentication
    for a user model.

    Args:
        BaseService ([Person, PersonCreate, PersonUpdate]): Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: Session):
        return cls(model=Person, database=database)

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[Person]:
        '''Retrieves a list of people sorted by creation date.

        Args:
            skip (int): Start cut of subset of people. Defaults to 0.
            limit (int): Number of people within the subset. Defaults to 50.

        Returns:
            list[Person]: A list of suggestion subset.
        '''
        return (
            self.database.query(self.model)
            .order_by(desc(self.model.created_at))
            .slice(skip, limit)
            .all()
        )
