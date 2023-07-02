class SessionConflict(Exception):
    '''Raised when there is a session conflict.'''


class MixingSession(Exception):
    '''Raised when one session is to be mixed with another session.'''
