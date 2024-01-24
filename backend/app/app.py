from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError

from app.api import api_v1_router
from app.containers import ApplicationContainer
from app.context.shared.domain.errors import DaoError
from app.core.config import Settings
from app.core.errors import HTTPException
from app.middlewares.error_handlers import (
  dao_error_exception_handler,
  http_exception_handler,
  request_validation_error_exception_handler,
  sqlalchemy_error_exception_handler,
)


__all__ = ('app',)

settings = Settings()  # type: ignore
container = ApplicationContainer()
container.config.from_dict(settings.model_dump())


app = FastAPI(
  title=container.config.project.name(),
  description=container.config.project.description(),
  version=container.config.project.version(),
  openapi_url=f'{container.config.domain.api_version()}/openapi.json',
)

app.container = container  # type: ignore

app.add_middleware(
  CORSMiddleware,
  allow_origins=[str(origin) for origin in container.config.domain.cors_origins()],
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*'],
)

app.include_router(api_v1_router, prefix=container.config.domain.api_version())

app.add_exception_handler(DaoError, dao_error_exception_handler)
app.add_exception_handler(SQLAlchemyError, sqlalchemy_error_exception_handler)
app.add_exception_handler(
  RequestValidationError, request_validation_error_exception_handler
)
app.add_exception_handler(HTTPException, http_exception_handler)
