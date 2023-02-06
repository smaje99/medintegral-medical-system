from fastapi_camelcase import CamelModel


class Message(CamelModel):
    '''Message schema.'''

    message: str
