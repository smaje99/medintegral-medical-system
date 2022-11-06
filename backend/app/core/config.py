from typing import Any

from pydantic import AnyHttpUrl, BaseSettings, PostgresDsn, validator


class DatabaseSettings(BaseSettings):
    ''' Settings for the database. '''
    host: str
    port: str
    uid: str
    pwd: str
    db: str

    echo: bool

    sqlalchemy_database_uri: PostgresDsn | None = None

    @validator('sqlalchemy_database_uri', pre=True)
    def assemble_db_connection(  # pylint: disable=no-self-argument
        cls, value: str | None, values: dict[str, Any]
    ) -> str | PostgresDsn:
        ''' Assemble the URI of the database connection. '''
        if isinstance(value, str):
            return value

        return PostgresDsn.build(
            scheme='postgresql+psycopg2',
            user=values.get('uid'),
            password=values.get('pwd'),
            host=values.get('host', ''),
            port=values.get('port'),
            path=f"/{values.get('db', '')}"
        )


class DomainSettings(BaseSettings):
    ''' Settings for the domain. '''
    api_version: str

    backend_cors_origins: str | list[AnyHttpUrl | str] = ['*']

    @validator('backend_cors_origins', pre=True)
    def assemble_cors_origins(  # pylint: disable=no-self-argument
        cls, value: str | list[str]
    ) -> list[str] | str:
        ''' Assemble the origins for the CORS. '''
        if isinstance(value, str) and not value.startswith('['):
            return [i.strip() for i in value.split(',')]
        if isinstance(value, (list, str)):  # pyright: ignore
            return value
        raise ValueError(value)


class ProjectSettings(BaseSettings):
    ''' Settings for the project. '''
    name: str
    version: str
    description: str


class JWTSettings(BaseSettings):
    ''' Settings for JWT. '''
    algorithm: str
    secret_key: str
    access_token_expire_minutes: int


class SecuritySettings(BaseSettings):
    ''' Settings for the security. '''
    jwt: JWTSettings


class Settings(BaseSettings):
    ''' Settings of the application. '''
    db: DatabaseSettings
    domain: DomainSettings
    project: ProjectSettings
    security: SecuritySettings

    class Config:  # pyright: ignore  # pylint: disable=[missing-class-docstring, too-few-public-methods]  # noqa: E501
        env_file = '.env'
        env_prefix = ''
        env_nested_delimiter = '__'
        allow_mutation = False
        case_sensitive = False


settings = Settings()  # type: ignore
