from fastapi import APIRouter

from .endpoints import (
    login,
    person,
    suggestion
)


api_router = APIRouter()
api_router.include_router(login.router, tags=['login'])
api_router.include_router(person.router, prefix='/person', tags=['person'])
api_router.include_router(suggestion.router, prefix='/suggestion', tags=['suggestion'])
