from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR

from app.context.shared.domain.errors import DaoError
from app.core.errors import HTTPException


__all__ = ('http_exception_handler', 'dao_error_exception_handler')


def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
  '''Handler for the HTTPException's.'''
  content = dict(message=exc.message)

  if exc.error_type:
    content['error_type'] = exc.error_type

  return JSONResponse(
    content=content,
    status_code=exc.status_code,
    headers=exc.headers
  )


def dao_error_exception_handler(_: Request, exc: DaoError):
  '''Handler for the DAOError's.'''
  raise HTTPException(status_code=HTTP_500_INTERNAL_SERVER_ERROR, message=exc.message)
