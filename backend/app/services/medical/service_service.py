from uuid import UUID

from sqlalchemy.orm import Session, selectinload
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import asc, true

from app.models.medical import Service, Specialty, ServiceDoctor, Doctor
from app.models.person import Person
from app.models.user import User
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

    def get(self, obj_id: UUID) -> Service:
        '''Retrieve a medical service by its identifier.

        Args:
            obj_id (UUID): Identifier of the medical service.

        Returns:
            Service: Medical service.
        '''
        service = (
            self.database.query(Service)
            .options(selectinload(Service.specialty))
            .filter(Service.id == obj_id)
            .filter(Service.is_active == true())
            .first()
        )

        if service:
            doctors_in_service = self.__get_doctors_by_service(service.id)

            for doctor in doctors_in_service:
                doctor_personal_data = self.__get_personal_data_from_doctor(
                    doctor.doctor_id
                )

                doctor.person = doctor_personal_data  # type: ignore
            service.doctors = doctors_in_service  # type: ignore

        return service

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

    def __get_doctors_by_service(self, service_id: UUID | str) -> list[ServiceDoctor]:
        '''Retrieve the doctors associated with a medical service.

        Args:
            service_id (UUID | str): Service ID given to retrieve the doctors.

        Returns:
            list[ServiceDoctor]: The doctors associated with the medical service.
        '''

        return (
            self.database.query(ServiceDoctor)
            .outerjoin(Doctor, ServiceDoctor.doctor_id == Doctor.dni)
            .outerjoin(User, Doctor.dni == User.dni)
            .filter(ServiceDoctor.service_id == service_id)
            .filter(ServiceDoctor.is_active == true())
            .filter(User.is_active == true())
            .all()
        )

    def __get_personal_data_from_doctor(self, doctor_id: int) -> Person | None:
        '''Retrieve the personal data of a doctor.

        Args:
            doctor_id (int): Doctor ID given to retrieve the personal data.

        Returns:
            Person: The personal data of the doctor.
        '''

        return self.database.query(Person).get(doctor_id)
