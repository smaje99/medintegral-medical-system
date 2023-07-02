from uuid import UUID

from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import asc, true

from app.models.medical import Service, Specialty
from app.schemas.medical.service import ServiceCreate, ServiceUpdate
from app.services.common.base import BaseService


class ServiceService(BaseService[Service, ServiceCreate, ServiceUpdate]):
    '''Service that provides CRUD operations for a medical service model.

    Args:
        BaseService ([Service, ServiceCreate, ServiceUpdate]): Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: Session):
        return cls(model=Service, database=database)

    def get_all_by_specialty(self, specialty_id: UUID) -> list[Service]:
        '''Retrieve all medical services associated with a medical specialty.

        Args:
            specialty_id (UUID): Specialty identifier.

        Returns:
            list[Service]: List of medical services.
        '''
        return (
            self.database.query(Service)
            .join(Specialty, Service.specialty_id == Specialty.id)
            .filter(Specialty.id == specialty_id)
            .filter(Service.is_active == true())
            .order_by(asc(Service.id))
            .order_by(asc(Service.name))
            .all()
        )

    def contains_by_name(self, name: str) -> bool:
        '''Checks if the service model contains the given name.
        Args:
            specialty_id (int): The name of the service to check for.
        Returns:
            bool: True if the service exists, False otherwise.
        '''
        query = self.database.query(Specialty).filter(
            func.lower(func.unaccent(Service.name)) == func.lower(func.unaccent(name))
        )
        return self.database.query(query.exists()).scalar()

    def disable(self, service: Service, disable: bool):
        '''Change the medical service's status in the system.
        The medical service can be enabled or disabled.

        Args:
            service (Service): Medical service to change the status.
            disable (bool): New status to be assigned to the medical service.

        Returns:
            Service: Medical service with updated status.
        '''
        update_data = {'is_active': not disable}
        return self.update(db_obj=service, obj_in=update_data)

    def is_active(self, service_id: UUID) -> bool:
        '''Checks if the medical service is active.

        Args:
            service_id (UUID): Identifier of the medical service.

        Returns:
            bool: True if the medical service is active, False otherwise.
        '''

        return (
            self.database.query(Service.is_active)
            .filter(Service.id == service_id)
            .scalar()
        )
