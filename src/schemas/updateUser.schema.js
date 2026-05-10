import { z } from "zod";

export const updateUserSchema = z.object({
  primer_nombre: z.string().min(2),
  segundo_nombre: z.string().optional(),
  primer_apellido: z.string().min(2),
  segundo_apellido: z.string().optional(),
  dni: z.string().length(8),
  correo: z.string().email(),
  telefono: z.string().length(9),
  url_img: z.string().url().optional(),
  id_estado_usuario: z.number(),
  id_rol: z.number(),
});