import { z } from "zod";

export const vehicleSchema = z.object({
  anio: z.number().int().min(1900).max(2027),
  color: z.string().min(3),
  precio_u: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().int().nonnegative(),
  tipo_combustible: z.enum(["Gasolina", "Diesel", "Eléctrico", "Híbrido", "GLP", "GNV"]),
  transmision: z.enum(["Mecánica", "Automatica"]),
  kilometraje: z.number().nonnegative(),
  nro_puertas: z.number().int().min(2).max(5),
  url_img: z.string().url("Debe ser una URL de imagen válida"),
  id_estado_vehiculo: z.number().int(),
  id_estado_vehiculo_venta: z.number().int(),
  id_modelo: z.number().int(),
  id_tipo_vehiculo: z.number().int()
});