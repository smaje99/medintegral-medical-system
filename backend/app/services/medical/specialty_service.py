from uuid import UUID

from sqlalchemy.orm import Session
from sqlalchemy.sql import func, true

from app.models.medical import Specialty, Service, ServiceDoctor, Doctor
from app.models.person import Person
from app.models.user import User
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
        specialty = self.database.query(Specialty).get(obj_id)

        if specialty:
            services = self.__get_services_by_specialty(specialty.id)

            for service in services:
                doctors_in_service = self.__get_doctors_by_service(service.id)

                for doctor in doctors_in_service:
                    doctor_personal_data = self.__get_personal_data_from_doctor(
                        doctor.doctor_id
                    )

                    doctor.person = doctor_personal_data  # type: ignore
                service.doctors = doctors_in_service  # type: ignore
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

    def __get_services_by_specialty(self, specialty_id: UUID | str) -> list[Service]:
        '''Retrieve the medical services associated with a specialty.

        Args:
            specialty_id (UUID | str): Specialty ID given to retrieve the
            medical services.

        Returns:
            list[Service]: The medical services associated with the specialty.
        '''

        return (
            self.database.query(Service)
            .filter(Service.specialty_id == specialty_id)
            .filter(Service.is_active == true())
            .all()
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
            .outerjoin(User, User.dni == Doctor.dni)
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
