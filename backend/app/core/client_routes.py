from enum import StrEnum, unique


@unique
class ClientRoutes(StrEnum):
  '''Client routes.'''

  DASHBOARD = '/dashboard'
