import { z } from 'zod';

import { DocumentType } from '../enum';

export const personDocumentTypeSchema = z.nativeEnum(DocumentType, {
  required_error: 'Tipo de documento de la persona es requerido',
  invalid_type_error: 'Tipo de documento de la persona es inválido',
});
