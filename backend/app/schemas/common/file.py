from fastapi_camelcase import CamelModel


class File(CamelModel):
    '''File schema.'''

    pathname: str
    type: str
