import { pool } from "../db.js";

export const getPosts = async (req, res, next) => {
  const response = await pool.query("SELECT * FROM zao_notas WHERE user_id = $1", [req.userId]);
  res.json(response.rows);
};

export const getPost = async (req, res, next) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM zao_notas WHERE id = $1", [id]);

  if (response.rows.length === 0) {
    return res.status(404).json({ message: "La nota no existe" });
  }
  res.json(response.rows[0]);
};

export const createPost = async (req, res, next) => {
  const { titulo, contenido, tags, color } = req.body;
  const user_id = req.userId;
  try {
    const response = await pool.query(
      "INSERT INTO zao_notas (titulo, contenido, tags, color, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [titulo, contenido, tags, color, user_id]
    );
  res.json(response.rows[0])
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const updatePost = async (req, res, next) => {
  const id = req.params.id;
  const { titulo, contenido, tags, color } = req.body;
  const response = await pool.query(
    "UPDATE zao_notas SET titulo = $1, contenido = $2, tags = $3, color = $4 WHERE id = $5 returning *",
    [titulo, contenido, tags, color, id]
  );

  if (response.rowCount === 0) {
    return res.status(404).json({ message: "La nota no existe" });
  }
  res.json(response.rows[0]);
};

export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  const response = await pool.query("DELETE FROM zao_notas WHERE id = $1", [id]);

  if (response.rowCount === 0) {
    return res.status(404).json({ message: "La nota no existe" });
  }
  res.status(204).json();
};
