from enum import Enum


class DocumentType(str, Enum):
    ''' Enum of types of identification documents. '''
    civil_registration = 'R.C.'
    identity_card = 'T.I.'
    citizenship_card = 'C.C.'
    foreign_id = 'C.E.'
