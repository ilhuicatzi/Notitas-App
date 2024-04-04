import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  jwt.verify(token, "password123456", (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "No autorizado" });
      }

      req.userId = decoded.id;
      next();
    }
  );
};