import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, rol: user.id_rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
};