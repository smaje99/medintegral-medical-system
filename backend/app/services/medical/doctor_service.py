from sqlalchemy.orm import Session

from app.models.medical import Doctor
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
