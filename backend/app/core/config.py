from pydantic import AnyHttpUrl, PostgresDsn, SecretStr, ValidationInfo, field_validator
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


__all__ = ('Settings',)


BOOLEAN = {'true': True, 'false': False}


class PostgresSettings(BaseSettings):
  '''Settings for Postgres database.'''

  host: str
  port: int
  uid: str
  pwd: SecretStr
  db: str

  echo: bool

  uri: PostgresDsn | None = None

  @field_validator('uri', mode='before')
  @classmethod
  def assemble_uri(cls, _: str, info: ValidationInfo) -> PostgresDsn | None:
    '''Assemble the URI of the Postgres database connection.'''
    data = info.data

    password = data.get('pwd', '')
    password = (
      password.get_secret_value() if isinstance(password, SecretStr) else password
    )

    return MultiHostUrl.build(
      scheme='postgresql+asyncpg',
      username=data.get('uid', 'postgres'),
      password=password,
      host=data.get('host', 'localhost'),
      port=data.get('port', 5432),
      path=data.get('db', 'postgres'),
    )

  @field_validator('echo', mode='before')
  @classmethod
  def transform_echo(cls, value: str) -> bool:
    '''Transform the echo value to a boolean.'''
    return BOOLEAN.get(value.lower(), False)


class ProjectSettings(BaseSettings):
  '''Settings for the project.'''

  name: str
  version: str
  description: str


class DomainSettings(BaseSettings):
  '''Settings for the domain.'''

  api_version: str
  server_host: str
  client_host: str

  cors_origins: str | list[AnyHttpUrl | str] = ['*']

  @field_validator('cors_origins', mode='before')
  @classmethod
  def assemble_cors_origins(cls, value: str | list[str]) -> list[str] | str:
    '''Assemble the CORS origins.'''
    if isinstance(value, str) and not value.startswith('['):
      return [i.strip() for i in value.split(',')]
    if isinstance(value, list):
      return value
    raise ValueError('Invalid CORS origins.')


class EmailSettings(BaseSettings):
  '''Settings for the emails.'''

  api_key: str

  from_email: str
  from_name: str

  emails_enabled: bool

  @field_validator('emails_enabled', mode='before')
  @classmethod
  def transform_emails_enabled(cls, value: str) -> bool:
    '''Transform the emails enabled value to a boolean.'''
    return BOOLEAN.get(value.lower(), False)


class RedisSettings(BaseSettings):
  '''Settings for the Redis cache.'''

  host_url: str
  prefix: str = 'myapi-cache'
  ignore_arg_types: list[type[object]] = []


class Settings(BaseSettings):
  '''Settings for the project.'''

  postgres: PostgresSettings
  project: ProjectSettings
  domain: DomainSettings
  email: EmailSettings
  redis: RedisSettings

  model_config = SettingsConfigDict(
    env_file='.env',
    env_prefix='',
    env_nested_delimiter='__',
    env_file_encoding='utf-8',
    case_sensitive=False,
    frozen=True,
  )
