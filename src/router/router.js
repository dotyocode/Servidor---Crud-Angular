//importando o router do express
import { Router } from "express";
import Cadastro from "../models/Cadastro";
//fazendo o router receber uma constante
const router = new Router();

//importando o cadastroController para dentro da rotas
import CadastroController from "../controllers/CadastroController";
import LoginController from "../controllers/LoginController";
const AuthMidleware = require('../Midlewares/AuthMidleware');

router.get("/", AuthMidleware ,CadastroController.index);
router.get("/nome/:id", AuthMidleware ,CadastroController.index2);
router.post("/registrar", AuthMidleware ,CadastroController.store);
router.get("/deletar/:id", AuthMidleware ,CadastroController.delete);
router.put("/editar/:id", AuthMidleware ,CadastroController.update);


//login
router.post("/login/registrar", LoginController.store);
router.post('/login', LoginController.index)


export default router;
