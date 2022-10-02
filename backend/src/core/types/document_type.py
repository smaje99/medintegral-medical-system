from enum import Enum


class DocumentType(str, Enum):
    civil_registration = 'R.C.'
    identity_card = 'T.I.'
    citizenship_card = 'C.C.'
    foreign_id = 'C.E.'
