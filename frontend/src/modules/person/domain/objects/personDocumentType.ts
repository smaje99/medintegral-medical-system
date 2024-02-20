import { z } from 'zod';

import { DocumentType } from '../enum';

export const personDocumentTypeSchema = z
  .nativeEnum(DocumentType, {
    required_error: 'Por favor, seleccione un documento',
    invalid_type_error: 'Ese no es un documento disponible',
  })
  .default(DocumentType.CITIZENSHIP_CARD);
