from sqlalchemy.orm import Session
from sqlalchemy.sql import true

from app.models.medical import Doctor
from app.models.user import User
from app.schemas.medical.doctor import DoctorCreate, DoctorUpdate
from app.services.common.base import BaseService


class DoctorService(BaseService[Doctor, DoctorCreate, DoctorUpdate]):
    '''Service that provides CRUD operations for a doctor model.

    Args:
        BaseService ([Doctor, DoctorCreate, DoctorUpdate]): Models and schemas.
    '''

    @classmethod
    def get_service(cls, database: Session):
        return cls(model=Doctor, database=database)

    def get_all(self, *, skip: int = 0, limit: int = 50) -> list[Doctor]:
        return (
            self.database.query(Doctor)
            .join(User)
            .filter(User.is_active == true())
            .slice(skip, limit)
            .all()
        )

    def is_active(self, doctor_id: int) -> bool:
        '''Checks if a doctor is active.

        Args:
            doctor_id (int): Doctor's id.

        Returns:
            bool: True if doctor is active, False otherwise.
        '''

        return self.database.query(User.is_active).filter(User.dni == doctor_id).scalar()
