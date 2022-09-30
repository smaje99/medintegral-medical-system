from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import uvicorn  # pyright: ignore

from api.api_v1 import api_router
from core.config import settings
from database.event import init_db


app = FastAPI(
    title=settings.project.name,
    description=settings.project.description,
    version=settings.project.version,
    openapi_url=f'{settings.domain.api_version}/openapi.json'
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.domain.backend_cors_origins],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.on_event('startup')  # pyright: ignore
async def startup():
    await init_db()


app.include_router(api_router, prefix=settings.domain.api_version)


if __name__ == '__main__':
    uvicorn.run('main:app')  # pyright: ignore
