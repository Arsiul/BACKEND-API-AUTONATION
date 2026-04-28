export const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Error de validación",
        errors: result.error.format(),
      });
    }

    // reemplaza el body con datos ya validados
    req.body = result.data;

    next();
  };
};