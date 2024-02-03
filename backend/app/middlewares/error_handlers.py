from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_500_INTERNAL_SERVER_ERROR

from app.context.shared.domain.errors import DaoError
from app.core.errors import HTTPException


__all__ = (
  'dao_error_exception_handler',
  'http_exception_handler',
  'request_validation_error_exception_handler',
  'sqlalchemy_error_exception_handler',
)


async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
  '''Handler for the HTTPException's.'''
  content = dict(message=exc.message)

  if exc.error_type:
    content['errorType'] = exc.error_type

  return JSONResponse(content=content, status_code=exc.status_code, headers=exc.headers)


async def dao_error_exception_handler(_: Request, exc: DaoError):
  '''Handler for the DAOError's.'''
  raise HTTPException(
    status_code=HTTP_500_INTERNAL_SERVER_ERROR, message=exc.message
  ) from exc


async def sqlalchemy_error_exception_handler(_: Request, exc: SQLAlchemyError):
  '''Handler for the SQLAlchemy errors.'''
  raise HTTPException(
    status_code=HTTP_500_INTERNAL_SERVER_ERROR,
    message=(
      'Lo sentimos, actualmente no podemos procesar su solicitud debido '
      + 'a problemas técnicos. Por favor, inténtelo de nuevo más tarde.'
    ),
  ) from exc


async def request_validation_error_exception_handler(
  _: Request, exc: RequestValidationError
):
  '''Handler for the RequestValidationError's.'''
  error = exc.errors()[0]['ctx']['error']
  message = str(error)

  raise HTTPException(
    status_code=HTTP_422_UNPROCESSABLE_ENTITY,
    message=message,
    error_type=exc,
  ) from exc
