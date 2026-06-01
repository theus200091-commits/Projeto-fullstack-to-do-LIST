import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import rota from './usuariosrotas.js'
import tarefasrotas from './tarefasrotas.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()
const __dirname =
path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static(
    path.join(__dirname, '..')
))

// ROTAS
app.use(rota)

app.use(tarefasrotas)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Mongo conectado'))
.catch((error) => console.log(error))

app.listen(3002, ()=>{
    console.log("Servidor rodando")
})