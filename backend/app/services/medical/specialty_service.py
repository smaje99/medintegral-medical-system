from uuid import UUID

from sqlalchemy.orm import Session
from sqlalchemy.sql import func, true

from app.models.medical import Specialty, Service
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

    def get(self, obj_id: UUID) -> Specialty | None:
        '''Retrieve a specialty using the given id,
        and also includes the medical services associated with it.

        Args:
            obj_id (UUID): ID given to retrieve the specialty.

        Returns:
            Specialty: The specialty retrieved.
        '''
        specialty = self.database.query(Specialty).filter(Specialty.id == obj_id).first()

        if specialty:
            services = (
                self.database.query(Service)
                .filter(Service.specialty_id == specialty.id)
                .filter(Service.is_active == true())
                .all()
            )
            specialty.services = services

        return specialty

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
