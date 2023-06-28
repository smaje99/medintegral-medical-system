from uuid import UUID

from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import true

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
    def get_service(cls, database: Session):
        return cls(model=ServiceDoctor, database=database)

    def contains_active_by_service_and_doctor(
        self, service_id: UUID, doctor_id: int
    ) -> bool:
        '''Checks if there is an active ServiceDoctor for the given service and doctor.

        Args:
            service_id (UUID): Service id.
            doctor_id (int): Doctor id.

        Returns:
            bool: True if there is an active ServiceDoctor, False otherwise.
        '''

        query = self.database.query(ServiceDoctor).filter(
            ServiceDoctor.service_id == service_id,
            ServiceDoctor.doctor_id == doctor_id,
            ServiceDoctor.is_active == true(),
        )

        return self.database.query(query.exists()).scalar()

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
