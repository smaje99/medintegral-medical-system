from typing import Any

from pydantic import BaseSettings, BaseConfig, PostgresDsn, validator


class Settings(BaseSettings):
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    POSTGRES_UID: str
    POSTGRES_PWD: str
    POSTGRES_DB: str

    DATABASE_ECHO: bool

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

    class Config(BaseConfig):  # pyright: ignore
        env_file = '.env'
        env_nested_delimiter = '__'
        allow_mutation = False
        case_sensitive = True


settings = Settings()  # pyright: ignore
