from fastapi import APIRouter

from .endpoints import suggestion


api_router = APIRouter()
api_router.include_router(suggestion.router, prefix='/suggestion', tags=['suggestion'])
