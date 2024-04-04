import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createToken } from "../libs/jwt.js";

export const signUp = async (req, res, next) => {
  const { nombre, nick, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const response = await pool.query(
      "INSERT INTO zao_usuarios (nombre, nick, email, password) VALUES ($1, $2, $3, $4) returning *",
      [nombre, nick, email, hash]
    );
    const token = await createToken({ id: response.rows[0].id }); // aqui se crea el token

    res.cookie("token", token, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60, // 1 hour
    });
    res.json(response.rows[0]);
  }
  catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    console.log(error);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await pool.query(
    "SELECT * FROM zao_usuarios WHERE email = $1",
    [email]
  );
  if (response.rows.length === 0) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }
  const user = response.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }
  const token = await createToken({ id: user.id });

  res.cookie("token", token, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60, // 1 hour
  });
  res.json(user);

};


export const signOut = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json();
};

export const getProfile = async (req, res) => {
  const response = await pool.query(
    "SELECT id, nombre, nick, email FROM zao_usuarios WHERE id = $1",
    [req.userId]
  );
  res.json(response.rows[0]);
};

export const updateProfile =  (req, res) => {
  res.json({ message: "PUT profile" });
};
