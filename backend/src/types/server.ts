import express from 'express';

const app = express();
const PORT = 9595;

app.use(express.json());
app.listen(PORT, ()=>{
    console.log('Server is running in: ${PORT}');
});