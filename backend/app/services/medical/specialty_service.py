from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from app.models.medical import Specialty
from app.schemas.medical.specialty import SpecialtyCreate, SpecialtyUpdate
from app.services.common.base import BaseService


class SpecialtyService(BaseService[Specialty, SpecialtyCreate, SpecialtyUpdate]):
    '''Service that provides CRUD operations for a specialty model.

    Args:
        BaseService ([Doctor, DoctorCreate, DoctorUpdate]): Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: Session):
        return cls(model=Specialty, database=database)

    def contains_by_name(self, name: str) -> bool:
        '''Checks if the specialty model contains the given name.
        Args:
            specialty_id (int): The name of the specialty to check for.
        Returns:
            bool: True if the specialty exists, False otherwise.
        '''
        query = self.database.query(Specialty).filter(
            func.lower(func.unaccent(Specialty.name)) == func.lower(func.unaccent(name))
        )
        return self.database.query(query.exists()).scalar()
