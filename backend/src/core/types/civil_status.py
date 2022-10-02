from enum import Enum


class CivilStatus(str, Enum):
    single = 'soltero'
    married = 'casado'
    divorced = 'divorciado'
    widower = 'viudo'
    union = 'unión marital'
