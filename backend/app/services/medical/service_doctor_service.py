from uuid import UUID

from sqlalchemy.orm import Session as DatabaseSession
from sqlalchemy.sql.expression import true

from app.core.exceptions import SessionConflict, MixingSession
from app.core.types import Session, ServiceType
from app.models.medical.service_doctor import ServiceDoctor
from app.schemas.medical.service_doctor import ServiceDoctorCreate, ServiceDoctorUpdate
from app.services.common.base.base_service import BaseService


class ServiceDoctorService(
    BaseService[ServiceDoctor, ServiceDoctorCreate, ServiceDoctorUpdate]
):
    '''Service that provides CRUD operations for ServiceDoctor model.

    Args:
        BaseService ([ServiceDoctor, ServiceDoctorCreate, ServiceDoctorUpdate]):
        Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: DatabaseSession):
        return cls(model=ServiceDoctor, database=database)

    def disable(self, service_doctor: ServiceDoctor, disable: bool) -> ServiceDoctor:
        '''Change the service-doctor's status in the system.
        The service-doctor can be enabled or disabled.

        Args:
            service_doctor (ServiceDoctor): ServiceDoctor to enable or disable.
            disable (bool): True to disable the service-doctor, False to enable it.

        Returns:
            ServiceDoctor: The updated service-doctor.
        '''

        update_data = {'is_active': not disable}
        return self.update(db_obj=service_doctor, obj_in=update_data)

    def get_all_by_service_and_doctor(
        self, service_id: UUID, doctor_id: int
    ) -> list[ServiceDoctor]:
        '''Get all service-doctor relationships for a service and doctor.

        Args:
            service_id (UUID): Service id.
            doctor_id (int): Doctor id.

        Returns:
            list[ServiceDoctor]: Service-doctor relationships.
        '''

        query = self.database.query(ServiceDoctor).filter(
            ServiceDoctor.service_id == service_id,
            ServiceDoctor.doctor_id == doctor_id,
            ServiceDoctor.is_active == true(),
        )

        return query.all()

    def check_session_and_service_type_hierarchy(
        self,
        session: Session,
        service_type: ServiceType,
        doctors_in_service: list[ServiceDoctor],
    ):
        '''Checks if the session and service type hierarchy is correct.

        Args:
            session (Session): Session.
            service_type (ServiceType): ServiceType.
            doctors_in_service (list[ServiceDoctor]): List of doctors in the service.

        Raises:
            SessionConflict: Session is already assigned in doctor's sessions.
            SessionConflict: Doctor's sessions is completed.
            SessionConflict: Doctor's session is full-day.
            MixingSession: Session and doctor's session can be blended
            into a full-day session.
        '''

        session_in_doctors = map(lambda sd: sd.session == session, doctors_in_service)

        # Check if session is already assigned in doctors' session
        if any(session_in_doctors) or (
            # Check if doctor's session is completed
            (len_of_doctors_in_service := len(doctors_in_service))
            > 1
        ):
            raise SessionConflict()

        if len_of_doctors_in_service == 1:
            doctor_in_service = doctors_in_service[0]

            # Check if doctor's session or session is full-day
            if Session.FULL_DAY in (doctor_in_service.session, session):
                raise SessionConflict()

            # Check if session and doctor's session can be blended
            if doctor_in_service.service_type == service_type:
                raise MixingSession()

    def update_doctor_session(
        self, service_doctor: ServiceDoctor, session: Session
    ) -> ServiceDoctor:
        '''Update doctor's session.

        Args:
            service_doctor (ServiceDoctor): ServiceDoctor to update.
            session (Session): Session.

        Returns:
            ServiceDoctor: The updated service-doctor.
        '''

        update_data = {'session': session}
        return self.update(db_obj=service_doctor, obj_in=update_data)
