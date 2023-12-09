__all__ = ('HTTPException',)


class HTTPException(Exception):
  '''An exception class representing HTTP errors.'''

  def __init__(
    self,
    status_code: int,
    message: str,
    error_type: Exception | type[Exception] | None = None,
    headers: dict[str, str] | None = None,
  ):
    '''An exception class representing HTTP errors.

    Args:
        status_code (int): The HTTP status code associated with the exception.
        message (str): The error message.
        error_type (Exception | type[Exception] | None, optional): The type of the
        associated exception.
        headers (dict[str, str] | None, optional):  Additional headers to include in
        the response.
    '''
    self.status_code = status_code
    self.message = message
    self.headers = headers

    if (isinstance(error_type, Exception)):
      self.error_type = error_type.__class__.__name__
    elif (isinstance(error_type, type)):
      self.error_type = error_type.__name__
    else:
      self.error_type = None
