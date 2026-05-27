import express from 'express';
import Tarefa from './tarefa.js';
import Usuario from './usuario.js';
import {tarefasrotasToken} from './autenticacao.js';

const rota = express.Router();


rota.post('/tarefas', tarefasrotasToken, async (req, res) => {
    try {
        const {titulo} = req.body;
        const usuarioId = req.usuario.id;
        const tarefa = new Tarefa({ usuarioId, titulo});
        await tarefa.save();
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

rota.get('/tarefas', tarefasrotasToken, async (req, res) =>{
    try {
        const usuarioId = req.usuario.id;
        const tarefas = await Tarefa.find({ usuarioId});
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

rota.put('/tarefas/:id', tarefasrotasToken, async (req, res) => {
    try {
        const {id} = req.params;
        const {titulo, status} = req.body;
        const usuarioId = req.usuario.id;
        const tarefa = await Tarefa.findOneAndUpdate(
            {_id: id, usuarioId},
            {titulo, status},
            {new: true}
        );
        if(!tarefa){
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        res.json(tarefa);
    } catch (error){
        res.status(400).json({ message: error.message });
    }
    });


rota.delete('/tarefas/:id', tarefasrotasToken, async (req, res) => {
    try {
        const {id} = req.params;
        const usuarioId = req.usuario.id;
        const tarefa = await Tarefa.findOneAndDelete({
            _id: id, usuarioId});
        if(!tarefa){
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        res.json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
export default rota;