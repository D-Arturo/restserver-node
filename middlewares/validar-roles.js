const { response } = require('express');
const esAdminRole = (req, res = response, next) => {
  if (!req.usuarioAutenticado) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero'
    });
  }
  const { rol, nombre } = req.usuarioAutenticado;
  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`
    });
  }
  next();
};

module.exports = { esAdminRole };
