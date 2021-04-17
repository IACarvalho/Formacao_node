import express, { response } from 'express'

const app = express()

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
})

app.get('/ola/:nome', (request, response) => {
  const { nome } = request.params
  response.send(`<h1>Olá, ${nome}!</h1>`)
})

app.get('/teste/:nome?', (requesicao, resposta) => {
  const name = requesicao.params.nome !== undefined? requesicao.params.nome: 'visitante'
  resposta.send(`<h1>Olá, ${name}</h1>`)
})

app.get('/canal', (request, response) => {
  const nome = request.query["nome"]

  if(nome){
    return response.send(`Seja bem-vindo ao canal ${nome}`)
  }
  
  return response.send('Seja bem-vindo')
})

app.listen(3333, (err) => {
  if(err){
    console.log(`Ocorreu o erro: ${err}`);
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
})