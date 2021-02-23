import express, { request, response } from 'express';

const app = express();

app.listen(3333, () => console.log('server is running'));

// http://localhost:3333/
app.get("/", (request, response) => {
  return response.json({massage: "Hello world"});
})

//1 param: rota
//2 param: req resp
app.post("/", (request, response) => {
  return response.json({massage: "Os dados foram salvos com sucesso!"});
})