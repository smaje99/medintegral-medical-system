from dependency_injector.containers import DeclarativeContainer
from dependency_injector.providers import Configuration


__all__ = ('ApplicationContainer',)


class ApplicationContainer(DeclarativeContainer):
  '''Container for the application dependencies.'''

  config = Configuration()
