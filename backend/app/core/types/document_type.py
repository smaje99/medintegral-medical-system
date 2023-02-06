from enum import Enum


class DocumentType(str, Enum):
    '''Enum of types of identification documents.'''

    civil_registration = 'R.C.'  # pylint: disable=invalid-name
    identity_card = 'T.I.'  # pylint: disable=invalid-name
    citizenship_card = 'C.C.'  # pylint: disable=invalid-name
    foreign_id = 'C.E.'  # pylint: disable=invalid-name
