from typing import Annotated

from pydantic import BeforeValidator

from app.context.person.domain.enums import DocumentType


__all__ = ('PersonDocumentType',)


def validate_person_document_type(document_type: DocumentType | str) -> DocumentType:
  '''Validate person's document type.

  Args:
      document_type (DocumentType | str): Person's document type

  Returns:
      DocumentType: Validated person's document type.
  '''
  assert document_type is not None, 'Documento de la persona es requerido.'
  assert document_type in DocumentType, 'Documento de la persona no es válido.'

  return DocumentType(document_type)


PersonDocumentType = Annotated[
  DocumentType, BeforeValidator(validate_person_document_type)
]
'''Value object person's document type.'''
