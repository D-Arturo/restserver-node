const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generateJwt } = require('../helpers/generate-jwt')

const login = async (req, res = response) => {
  const { correo, password } = req.body

  try {
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      return res.status(400).json({
        msg: 'usuario/password incorrectos - correo'
      })
    }

    if (!usuario.estado) {
      return res.status(400).json({
        mseg: 'usuario/password incorrectos - estado:false'
      })
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        mseg: 'usuario/password incorrectos - password'
      })
    }

    const token = await generateJwt(usuario.id)

    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'error',
      error
    })
  }
}

module.exports = {
  login
}
