import Cadastro from "../models/Cadastro";
const validator = require("validator");

class CadastroController {
  //mostrar o cadastro
  async index(req, res, next) {
    const cadastro = await Cadastro.find({}).exec((err, cad) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(cad);
      }
    });
  }

  async index2(req, res, next) {
    const cadastro = await Cadastro.find({ _id: req.params.id }).exec(
      (err, cad) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(cad);
        }
      }
    );
  }

  //criar
  async store(req, res, next) {

    //verificando se o nome é menor que 3 caracteres
    if(req.body.nome.length <= 3){
      res.status(400).send({msg: "O nome precisa ter mais que 3 caracteres"})
    }

    //verificando se a senha tem mais de 5 caracteres
    if(req.body.senha.length <= 5){
      res.status(400).send({msg: "Sua senha precisa ter mais que 5 caracteres"})
    }

    const { nome, idade, email, senha } = req.body;
    const reg = await Cadastro.create({
      nome,
      idade,
      email,
      senha,
    });

    const registrar = await Cadastro.find({}).exec((err, regs) => {
      if (err) {
        res.status(500).send({ msg: "houve um erro no servidor" });
      } else {
        res.status(200).send({ msg: "Cadastro feito com Sucesso" });
      }
    });
  }

  async delete(req, res, next) {
    Cadastro.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ msg: "deletado" });
      })
      .catch((err) => {
        rest.status(500).json({ msg: "Houve um erro" });
      });
  }

  async update(req, res, next) {

     //verificando se o email é valido
     if(!validator.isEmail(req.body.email)) {
      res.status(400).send({msg: "Email Invalido"})
    } 

    //verificando se o nome é menor que 3 caracteres
    if(req.body.nome.length <= 3){
      res.status(400).send({msg: "O nome precisa ter mais que 3 caracteres"})
    }

    //verificando se a senha tem mais de 5 caracteres
    if(req.body.senha.length <= 5){
      res.status(400).send({msg: "Sua senha precisa ter mais que 5 caracteres"})
    }
    
    //buscar o id
    const { id } = req.params;
    const { nome, idade, email } = req.body;
    console.log(req.params);

    const cadastro = await Cadastro.findById(id);
    console.log(cadastro);
    cadastro.nome = nome;
    cadastro.idade = idade;
    cadastro.email = email;

    await cadastro.save();
    return res.status(200).json({ msg: "Cadastro Editado" });
  }
}

export default new CadastroController();
