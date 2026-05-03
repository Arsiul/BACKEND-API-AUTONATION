export const roleMiddleware = (...rolespermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    if (!rolespermitidos.includes(req.user.rol)) {
      return res.status(403).json({ message: "No tienes permisos" });
    }

    next();
  };
};