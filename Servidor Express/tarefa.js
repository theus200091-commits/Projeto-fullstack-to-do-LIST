import mongoose from 'mongoose'

const tarefaSchema = new mongoose.Schema({
usuarioId:{type:mongoose.Schema.Types.ObjectId, ref:'Usuario', required:true},
titulo:{ type:String, required:true},
status:{type: String, enum: ['fazer', 'fazendo', 'feito'], default: 'fazer'}
}, {timestamps:true})

const Tarefa = mongoose.model('Tarefa', tarefaSchema)
export default Tarefa