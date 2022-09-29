from typing import Any

from pydantic import AnyHttpUrl, BaseSettings, PostgresDsn, validator


class DatabaseSettings(BaseSettings):
    host: str
    port: str
    uid: str
    pwd: str
    db: str

    echo: bool

    sqlalchemy_database_uri: PostgresDsn | None = None

    @validator('sqlalchemy_database_uri', pre=True)
    def assemble_db_connection(cls, v: str | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v

        return PostgresDsn.build(
            scheme='postgresql+asyncpg',
            user=values.get('uid'),
            password=values.get('pwd'),
            host=values.get('host', ''),
            port=values.get('port'),
            path=f"/{values.get('db', '')}"
        )


class DomainSettings(BaseSettings):
    api_version: str

    backend_cors_origins: str | list[AnyHttpUrl | str] = ['*']

    @validator('backend_cors_origins', pre=True)
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str] | str:
        if isinstance(v, str) and not v.startswith('['):
            return [i.strip() for i in v.split(',')]
        elif isinstance(v, (list, str)):  # pyright: ignore
            return v
        raise ValueError(v)


class ProjectSettings(BaseSettings):
    name: str
    version: str
    description: str


class Settings(BaseSettings):
    db: DatabaseSettings
    domain: DomainSettings
    project: ProjectSettings

    class Config:  # pyright: ignore
        env_file = '.env'
        env_prefix = ''
        env_nested_delimiter = '__'
        allow_mutation = False
        case_sensitive = False


settings = Settings()  # pyright: ignore
