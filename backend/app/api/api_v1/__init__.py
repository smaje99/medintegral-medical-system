from fastapi import APIRouter

from .endpoints import (
    doctor,
    files,
    login,
    person,
    role,
    service,
    specialty,
    suggestion,
    user,
)


api_router = APIRouter()

api_router.include_router(login.router, tags=['login'])
api_router.include_router(person.router, prefix='/person', tags=['person'])
api_router.include_router(role.router, prefix='/role', tags=['role'])
api_router.include_router(suggestion.router, prefix='/suggestion', tags=['suggestion'])
api_router.include_router(user.router, prefix='/user', tags=['user'])
api_router.include_router(doctor.router, prefix='/doctor', tags=['doctor'])
api_router.include_router(specialty.router, prefix='/specialty', tags=['specialty'])
api_router.include_router(files.router, prefix='/files', tags=['files'])
api_router.include_router(service.router, prefix='/service', tags=['service'])
