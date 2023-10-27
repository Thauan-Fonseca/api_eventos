const express = require('express');
const app = express();

app.use(express.json())
const productsController = require('./controllers/eventos_controller.js')

app.listen(3000, () => {
    console.log("Rodando na porta " + 3000);
});

app.use('/api/eventos', productsController);
app.get('*', (req,res)=> {res.status(404).sendFile(`${__dirname}/404.html`)});