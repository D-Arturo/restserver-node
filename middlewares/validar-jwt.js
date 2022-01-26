const jwt = require('jsonwebtoken');
const {
  response,
  request
} = require('express');
const Usuario = require('../models/usuario');

const validarJwt = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'error en el token de validación - no hay'
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid; // estamos creando una propiedad nueva en el objeto req(request) para en los middlewares/controlador posteriores tener acceso a ello
    const usuarioAutenticado = await Usuario.findById(uid);
    if (!usuarioAutenticado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe'
      });
    }
    // verificar si el uid tiene estado en true
    if (!usuarioAutenticado.estado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario "borrado", estado:false'
      });
    }
    req.usuarioAutenticado = usuarioAutenticado;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido'
    });
  }
};

module.exports = { validarJwt };
