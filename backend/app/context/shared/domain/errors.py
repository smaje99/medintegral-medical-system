from typing import Self


__all__ = (
  'DomainError',
  'ResourceNotFound',
  'DaoError',
)


class DomainError(Exception):
  '''Domain error class.'''

  def __init__(self, message: str):
    '''Domain error class constructor.

    Args:
        message (str): The error message.
    '''
    self.message = message


class ResourceNotFound(DomainError):
  '''Resource not found error class.'''


class DaoError(DomainError):
  '''Data access error class.'''

  @classmethod
  def save_operation_failed(cls) -> Self:
    '''Save operation failed error class.

    Returns:
        DaoError: The error class instance.
    '''
    return cls('Operación de guardado fallida')

  @classmethod
  def retrieve_operation_failed(cls) -> Self:
    '''Retrieve operation failed error class.

    Returns:
        DaoError: The error class instance.
    '''
    return cls('Operación de recuperación fallida')

  @classmethod
  def update_operation_failed(cls) -> Self:
    '''Update operation failed error class.

    Returns:
        DaoError: The error class instance.
    '''
    return cls('Operación de actualización fallida')

  @classmethod
  def delete_operation_failed(cls) -> Self:
    '''Delete operation failed error class.

    Returns:
        DaoError: The error class instance.
    '''
    return cls('Operación de eliminación fallida')
