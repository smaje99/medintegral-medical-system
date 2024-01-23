from enum import StrEnum


class DocumentType(StrEnum):
  '''Enum of types of identification documents.'''

  CIVIL_REGISTRATION = 'R.C.'
  IDENTITY_CARD = 'T.I.'
  CITIZENSHIP_CARD = 'C.C.'
  FOREIGN_ID = 'C.E.'
