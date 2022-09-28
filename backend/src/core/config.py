from typing import Any

from pydantic import AnyHttpUrl, BaseSettings, BaseConfig, PostgresDsn, validator


class Settings(BaseSettings):
    API_VERSION: str

    PROJECT_NAME: str
    PROJECT_VERSION: str
    PROJECT_DESCRIPTION: str

    BACKEND_CORS_ORIGINS: list[AnyHttpUrl | str] = ['*']

    @validator('BACKEND_CORS_ORIGINS', pre=True)
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str] | str:
        if isinstance(v, str) and not v.startswith('['):
            return [i.strip() for i in v.split(',')]
        elif isinstance(v, (list, str)):  # pyright: ignore
            return v
        raise ValueError(v)

    POSTGRES_HOST: str
    POSTGRES_PORT: str
    POSTGRES_UID: str
    POSTGRES_PWD: str
    POSTGRES_DB: str
    SQLALCHEMY_DATABASE_URI: PostgresDsn | None = None

    @validator('SQLALCHEMY_DATABASE_URI', pre=True)
    def assemble_db_connection(cls, v: str | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v

        return PostgresDsn.build(
            scheme='postgresql+asyncpg',
            user=values.get('POSTGRES_UID'),
            password=values.get('POSTGRES_PWD'),
            host=values.get('POSTGRES_HOST', ''),
            port=values.get('POSTGRES_PORT'),
            path=f"/{values.get('POSTGRES_DB') or ''}"
        )

    DATABASE_ECHO: bool

    class Config(BaseConfig):  # pyright: ignore
        env_file = '.env'
        env_nested_delimiter = '__'
        allow_mutation = False
        case_sensitive = True


settings = Settings()  # pyright: ignore
