'use strict'
const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {
    return new Promise((resolve, reject) => {

        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {

                if(error){
                    console.log(error)
                    reject('No se pudo generar el token')
                }
                resolve(token);
        })

    })
}

module.exports = {
    generateJwt
}