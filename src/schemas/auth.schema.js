import {z} from 'zod';

export const signUpSchema = z.object({
  nombre: z.string(
    {
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser de tipo string",
      length_error: "El nombre debe tener entre 3 y 50 caracteres",
    }
  ).min(3).max(50),
  nick: z.string(
    {
      required_error: "El username es requerido",
      invalid_type_error: "El username debe ser de tipo string",
      length_error: "El username debe tener entre 3 y 50 caracteres",
    }
  ).min(3).max(50),
  email: z.string(
    {
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser de tipo string",
    }
  ).email({
    message: "El email no es válido",
  }),
  password: z.string(
    {
      required_error: "La contraseña es requerida",
      invalid_type_error: "La contraseña debe ser de tipo string",
    }
  ).min(6,{
    message: "La contraseña debe tener al menos 6 caracteres",
  }).max(50,{
    message: "La contraseña debe tener menos de 50 caracteres",
  }),
});

export const signInSchema = z.object({
  email: z.string(
    {
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser de tipo string",
    }
  ).email({
    message: "El email no es válido",
  }),
  password: z.string(
    {
      required_error: "La contraseña es requerida",
      invalid_type_error: "La contraseña debe ser de tipo string",
      password_error: "Contraseña incorrecta",
    }
  ).min(6,{
    message: "La contraseña debe tener al menos 6 caracteres",
  }).max(50,{
    message: "La contraseña debe tener menos de 50 caracteres",
  }),
});
