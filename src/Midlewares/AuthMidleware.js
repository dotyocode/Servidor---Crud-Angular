const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const {promisify} = require('util')

module.exports = async(req, res, next) => {
  const auth = req.headers.authorization;

  if(!auth){
    return res.status(400).json({
      error: true,
      code: 130,
      message: "O token de Autenticação não existe"
    })
  }

  //separando o barer do token
  const [, token] = auth.split(' ');

  //verificando se token existe
  try{
    const decodificar = await promisify(jwt.verify)(token, authConfig.secret)

    if(!decodificar){
      return res.status(400).json({
        error: true,
        code: 130,
        message: "O token está expirado"
      })
    }else{
      req.user = decodificar.id;
      next()
    }
  }catch{
    return res.status(400).json({
      error: true,
      code: 130,
      message: "O token está Inválido"
    })
  }

  console.log(auth)
}