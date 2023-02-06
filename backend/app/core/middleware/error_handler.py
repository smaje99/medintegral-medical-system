from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST

from app.core.exceptions import DatabaseException


def database_exception_handler(_: Request, exc: DatabaseException):
    '''Handler for database exceptions.'''
    return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={'detail': str(exc)})
