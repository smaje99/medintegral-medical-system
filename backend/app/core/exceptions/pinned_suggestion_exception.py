from sqlalchemy.exc import InternalError


class PinnedSuggestionException(Exception):
    '''Handle the exception raised from the trigger on
    the amount of suggestion pinned in the database.
    '''

    def __init__(self, error: InternalError):
        '''Construct to the Pinned Suggestion Exception.

         Args:
            error (InternalError): origin of the error that occurred
        '''
        self.error = error

    def __str__(self) -> str:
        '''Returns the error message raised from the trigger in the database.

        Returns:
            str: error message
        '''
        return self.error.orig.diag.message_primary
