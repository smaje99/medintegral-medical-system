from sqlalchemy.orm import Session

from app.models.medical import Doctor
from app.schemas.medical.doctor import DoctorCreate, DoctorUpdate
from app.services import BaseService


class DoctorService(BaseService[Doctor, DoctorCreate, DoctorUpdate]):
    '''Service that provides CRUD operations for a doctor model.

    Args:
        BaseService ([Doctor, DoctorCreate, DoctorUpdate]): Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: Session):
        return cls(model=Doctor, database=database)

    def contains(self, doctor_id: int) -> bool:
        '''Checks if the doctor model contains the given id.
        Args:
            doctor_id (int): The ID of the doctor to check for.
        Returns:
            bool: True if the doctor exists, False otherwise.
        '''
        query = self.database.query(Doctor).filter(Doctor.dni == doctor_id)
        return self.database.query(query.exists()).scalar()
