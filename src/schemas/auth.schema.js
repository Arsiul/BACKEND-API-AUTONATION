import { z } from "zod";

export const clientSchema = z.object({
  primer_nombre: z.string().min(3, "Debe tener al menos 3 caracteres"),
  segundo_nombre: z.string().min(3, "Debe tener al menos 3 caracteres").nullable().optional(),
  primer_apellido: z.string().min(3, "Debe tener al menos 3 caracteres"),
  segundo_apellido: z.string().min(3, "Debe tener al menos 3 caracteres").nullable().optional(),
  dni: z.string()
    .min(8, "DNI inválido")
    .max(8, "DNI inválido")
    .regex(/^[0-9]+$/, "El DNI solo debe contener números"),
  telefono: z.string()
    .min(9, "Teléfono inválido")
    .max(9, "Teléfono inválido")
    .regex(/^[0-9]+$/, "Solo números"),
  correo: z.string().email("Correo inválido"),
  direccion: z.string().min(5, "Dirección muy corta"),
  url_img: z.string().url("Debe ser una URL válida").nullable().optional(),
});

export const userSchema = z.object({
  primer_nombre: z.string().min(2),
  segundo_nombre: z.string().nullable().optional(),
  primer_apellido: z.string().min(2),
  segundo_apellido: z.string().nullable().optional(),
  dni: z.string().length(8),
  correo: z.string().email(),
  telefono: z.string().length(9),
  url_img: z.string().url().nullable().optional(),
  id_estado_usuario: z.number(),
  id_rol: z.number(),
  contrasena: z.string().min(1)
});