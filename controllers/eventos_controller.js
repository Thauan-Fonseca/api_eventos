const express = require('express');
const router = express.Router();
const path = require('path');
const repository = require('better-sqlite3')(path.join(__dirname,'..', 'banco.db'))

router.get("/", (req, res) => {
    const all = repository.prepare("SELECT * FROM eventos").all();
    
    res.status(200).json((all));
});

router.post('/', (req, res) => {
    const result = repository.prepare("INSERT INTO eventos (nome, data_referencia) values (?, ?)").run(req.body.nome, req.body.data_referencia);
    if(result.changes =! 1) res.status(500).json("Não foi possível inserir novo arquivo");
    const updated = repository.prepare(`select * from eventos where nome = ?`).get(req.body.nome)
    res.status(200).json(updated);
});

router.delete('/:id', (req, res) => {

    const data = repository.prepare("SELECT data_referencia from eventos WHERE id = (?)").get(req.params.id);

    if(!data){
        res.status(404).json("Esse evento não existe")
    }

    const dataEvento = data.data_referencia;
    const dataDoEvento = new Date(dataEvento);
    const dataAtual = new Date();

    if (dataDoEvento >= dataAtual){
         result = repository.prepare("DELETE FROM eventos WHERE id = (?)").run(req.params.id);
        const all = repository.prepare("SELECT * FROM eventos").all();
        res.status(200).json(all);
    } else {
        res.status(404).json("Esse evento já aconteceu e não pode ser excluído")
    }
    
})


module.exports = router;