class IncorrectCredentialsException(Exception):
    ''' Handler the exception for incorrect credentials. '''

    def __init__(self, message: str):
        '''Construct for the Incorrect Credentials Exception.

        Args:
            message (str): Error message.
        '''
        self.message = message

    def __str__(self) -> str:
        '''Returns the given error message.

        Returns:
            str: error message.
        '''
        return self.message
