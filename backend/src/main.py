from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import uvicorn  # pyright: ignore

from core.config import settings
from database.event import init_db


app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION,
    openapi_url=f'{settings.API_VERSION}/openapi.json'
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.on_event('startup')  # pyright: ignore
async def startup():
    await init_db()


if __name__ == '__main__':
    uvicorn.run('main:app')  # pyright: ignore
