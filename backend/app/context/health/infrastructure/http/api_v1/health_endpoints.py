from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends
from starlette.status import HTTP_200_OK

from app.context.health.infrastructure.health_dto import HealthResponse
from app.context.health.infrastructure.http.api_v1 import HealthController


__all__ = ('router',)


router = APIRouter()


@router.get('/', status_code=HTTP_200_OK)
@inject
async def check_health(
  health_controller: HealthController = Depends(  # noqa: B008
    Provide['health.health_controller']
  ),
) -> HealthResponse:
  return await health_controller()
