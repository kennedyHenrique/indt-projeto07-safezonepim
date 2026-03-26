import 'dotenv/config'
import express from 'express';
import { AppDataSource } from '../database/dataSource.js';

const app = express();
const PORT = process.env.PORT ?? 9595;

app.use(express.json());

console.log(process.env.DB_PASS)

app.get('/health', (req,res) => {
    res.json({ status: 'ok', mensagem: 'Servidor funcionando!' });
});

AppDataSource.initialize()
    .then(()=> {
        console.log('Banco de Dados conectado!');
        app.listen(PORT,()=>{
            console.log(`Servidor rodando na porta ${PORT}`);
        })
    })
    .catch((error)=> {
        console.error('Erro ao conectar o banco:', error);
    });