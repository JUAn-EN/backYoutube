const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = 'mi_clave_secreta';

app.use(cors());
app.use(express.json());

const usuariosSimulados = [
  { id: 1, nombre_usuario: 'Juan Estaban', correo_E: 'jestenieto@gmail.com', edad: 25, contraseña: 'contraseña1' },
  { id: 2, nombre_usuario: 'Angela Maria', correo_E: 'angela@gmail.com', edad: 30, contraseña: 'contraseña2' },
  { id: 3, nombre_usuario: 'Sergio Riko', correo_E: 'Checho@gmail.com', edad: 22, contraseña: 'contraseña3' },
  { id: 4, nombre_usuario: 'Jesus Gonzales', correo_E: 'Jesus@gmail.com', edad: 28, contraseña: 'contraseña4' },
  { id: 5, nombre_usuario: 'Milton parra', correo_E: 'MiltonP@gmail.com', edad: 35, contraseña: 'contraseña5' },
  {  id:6,   nombre_usuario:'Carlos David',correo_E:'CarlosD@gmail.com', edad:18, contraseña:'contraseña6'}
];

function generarToken(usuario) {
  const payload = {
    nombre_usuario: usuario.nombre_usuario,
    id_usuario: usuario.id
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

  return token;
}

app.post('/login', (req, res) => {
  const correo_E = req.body.correo_E;
  const contraseña = req.body.contraseña;

  const usuarioEncontrado = usuariosSimulados.find(
    usuario => usuario.correo_E === correo_E && usuario.contraseña === contraseña
  );

  if (usuarioEncontrado) {
    const token = generarToken(usuarioEncontrado);
    res.json({ token, usuario: usuarioEncontrado });
  } else {
    res.sendStatus(401);
  }
});

app.listen(3001, () => {
  console.log('Corriendo en el puerto 3001');
});
