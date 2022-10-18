from enum import Enum


class CivilStatus(str, Enum):
    ''' Enum of Civil status. '''
    single = 'soltero'
    married = 'casado'
    divorced = 'divorciado'
    widower = 'viudo'
    union = 'unión marital'
