from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.api_v1 import api_router
from app.core.config import settings
from app.core.exceptions import DatabaseException
from app.core.middleware.error_handler import database_exception_handler
from app.database.event import init_db


app = FastAPI(
    title=settings.project.name,
    description=settings.project.description,
    version=settings.project.version,
    openapi_url=f'{settings.domain.api_version}/openapi.json'
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        str(origin) for origin in settings.domain.backend_cors_origins
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.on_event('startup')  # pyright: ignore
def startup():
    ''' Startup event handler. '''
    init_db()


app.include_router(api_router, prefix=settings.domain.api_version)

app.add_exception_handler(  # type: ignore
    DatabaseException,
    database_exception_handler
)
