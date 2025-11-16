const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const livrosRouter = require("./livros");


 
app.use(express.json());
app.use(cors());
app.use("/livros", livrosRouter); //identificação da rota e da const (require) associada


app.get('/',(req, res)=>{
    res.send("Olá...Servidor Rodando!");
});
app.get('/introducao', (req, res)=>{
    res.send('<h2>Introdução ao Express </h2>');
})



app.post('/filmes',(req, res)=>{
    
    const {titulo, genero} = req.body;
    res.send(`Filme:${titulo} - Gênero: ${genero}, recebido...`);
});


const log = (req, res, next) => {
    console.log(`....................... Acessado em ${new Date()}`);
    next();
}


app.get('/transfere', log, (req, res) => {
    res.send("Ok! Valor transferido com sucesso...");
});



// arquivo com rotas para o cadastro de livros
    
app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});
