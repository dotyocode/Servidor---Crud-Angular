//importar o express para dentro do app
import express from "express";
const app = express();
var cors = require("cors");
app.use(cors());

//importando o database para dentro do app
//database onde ficara o mongoose
import "./database";

//importando o path para diretorios publicos
import path from "path";

//importando o bodyParser
import bodyParser from "body-parser";

//configuração padrao body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//importando as rotas para dentro do app
import router from "./router/router";
//fazendo a variavel app usar o express
app.use(express.json());
//usando as rotas do routes
app.use(router);

//evitnado erros de cors
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//exportando o app
export default app;
