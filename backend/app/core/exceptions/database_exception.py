from sqlalchemy.exc import InternalError


class DatabaseException(Exception):
    ''' Handle the exception raised from the database. '''

    def __init__(self, error: InternalError):
        '''Construct to the Database Exception.

         Args:
            error (InternalError): origin of the error that occurred
        '''
        self.error = error

    def __str__(self) -> str:
        '''Returns the error message raised from the database.

        Returns:
            str: error message
        '''
        return self.error.orig.diag.message_primary
