import Login from "../models/Login";
const validator = require("validator");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

class LoginController {
  //mostrar o cadastro
  async index(req, res, next) {    

    //Verificação se existe email no banco de dados
    const user = await Login.findOne({email: req.body.email, senha: req.body.senha});      
    if(!user) {
      return res.status(400).send({msg: "Login Invalido"})
      console.log(res)
    }

    //retornando o token
    return res.status(200).json({
      
      user: {
        email: user.email,
        senha: user.senha
      },
      token: jwt.sign(
        {id: user._id},
        authConfig.secret,
        {expiresIn: authConfig.expireIn})
    })
  } 

  //criar
  async store(req, res, next) {

    //verificando se o email é valido
    if(!validator.isEmail(req.body.email)) {
      res.status(400).send({msg: "Email Invalido"})
    }

    //Verificação se existe email no banco de dados
    const user = await Login.findOne({email: req.body.email});
    if(user) {
      res.status(400).send({msg: "Email já Cadastrado"})
    }

    //verificando se o nome é menor que 3 caracteres
    if(req.body.nome.length <= 3){
      res.status(400).send({msg: "O nome precisa ter mais que 3 caracteres"})
    }

    //verificando se a senha tem mais de 5 caracteres
    if(req.body.senha.length <= 5){
      res.status(400).send({msg: "Sua senha precisa ter mais que 5 caracteres"})
    }

    const { nome, email, senha } = req.body; 
    const loginReg = await Login.create({
      nome, 
      email,
      senha,
    }); 

    const loginRegister = await Login.find({}).exec((err, regs) => {
      if (err) {
        res.status(500).send({ msg: "houve um erro ao cadastrar o login" });
      } else {
        res.status(200).send({ msg: "Cadastro feito com Sucesso" });
      }
    });
  }  
}

export default new LoginController();
