import {z} from 'zod';

export const postCreateSchema = z.object({
  titulo: z.string(
    {
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser de tipo string",
      length_error: "El título debe tener entre 2 y 50 caracteres",
    }
  ).min(2).max(50),
  contenido: z.string({
    invalid_type_error: "El contenido debe ser de tipo string",
    length_error: "El contenido debe tener menos de 500 caracteres",
  }).max(500).optional(),
  tags: z.string().max(50).optional(),
  color: z.string().max(20).optional(),
});

export const postUpdateSchema = z.object({
  titulo: z.string(
    {
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser de tipo string",
      length_error: "El título debe tener entre 2 y 50 caracteres",
    }
  ).min(2).max(50),
  contenido: z.string({
    invalid_type_error: "El contenido debe ser de tipo string",
    length_error: "El contenido debe tener menos de 500 caracteres",
  }).max(500).optional(),
  tags: z.string().max(50).optional(),
  color: z.string().max(20).optional(),
});