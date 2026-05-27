
import express from "express";
import { criarConta, login } from "./autenticacao.js";
import Usuario from './usuario.js'

const rota = express.Router();

rota.post("/autenticacao", criarConta);

//LOGIN
rota.post("/login", login);

rota.get("/usuarios", async(req, res)=>{

    const usuarios = await Usuario.find()

    res.json(usuarios)
})

export default rota;