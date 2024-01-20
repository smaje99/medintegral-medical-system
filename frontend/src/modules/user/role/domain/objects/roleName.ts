import { z } from 'zod';

export const roleNameSchema = z
  .string()
  .min(4, 'Nombre del rol debe tener al menos 4 caracteres')
  .max(20, 'Nombre del rol debe tener menos de 20 caracteres')
  .regex(/^[a-zA-Z]+$/, 'Nombre del rol debe contener solo letras')
  .regex(/^\S+$/, 'Nombre de rol debe ser una única palabra');
