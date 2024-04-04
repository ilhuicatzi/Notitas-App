import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, "password123456", { expiresIn: '1h' }, (error, token) => {
      if (error) {
        console.error(error);
        reject('No se pudo generar el token');
      }
      resolve(token);
    });
  });
}