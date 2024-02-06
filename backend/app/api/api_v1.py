from fastapi import APIRouter

from app.context.health.infrastructure.http.api_v1 import health_router
from app.context.person.infrastructure.http.api_v1 import person_router
from app.context.user.role.infrastructure.http.api_v1 import role_router
from app.context.user.user.infrastructure.http.api_v1 import user_router


__all__ = ('api_router',)


api_router = APIRouter()

api_router.include_router(role_router, prefix='/role', tags=['Role'])
api_router.include_router(health_router, prefix='/health', tags=['Health'])
api_router.include_router(user_router, prefix='/user', tags=['User'])
api_router.include_router(person_router, prefix='/person', tags=['Person'])
