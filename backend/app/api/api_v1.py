from fastapi import APIRouter

from app.context.user.role.infrastructure.http.api_v1 import role_router


__all__ = ('api_router',)


api_router = APIRouter()

api_router.include_router(role_router, prefix='/role', tags=['Role'])
