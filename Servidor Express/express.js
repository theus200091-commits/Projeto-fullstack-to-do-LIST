import express from 'express'
import mongoose from 'mongoose'
import rota from './usuariosrotas.js'
import tarefasrotas from './tarefasrotas.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'



const __dirname =path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..')))

app.use(rota)

mongoose.connect('mongodb://matheus545152:3dKHLGi7ii6l2TsO@ac-3mceybe-shard-00-00.gwnnovr.mongodb.net:27017,ac-3mceybe-shard-00-01.gwnnovr.mongodb.net:27017,ac-3mceybe-shard-00-02.gwnnovr.mongodb.net:27017/Usuarios?ssl=true&replicaSet=atlas-bvdc35-shard-0&authSource=admin&appName=UsuariosToDoLiST').then(() => console.log("Conectado ao banco de dados Mongo"))
    .catch((error) => console.log(error))
.then(()=> console.log("Mongo conectado"))
.catch((error)=> console.log(error))

app.listen(3002, ()=>{
    console.log("Servidor rodando")
})