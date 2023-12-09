from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.errors import HTTPException


__all__ = ('http_exception_handler',)


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
