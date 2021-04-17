# Formação NodeJS(Anotações feitas durante o curso)

## O que é o NodeJS
NodeJS é um interpretador Javaxrip escrito em C++ que permite executar o código javascript fora dos naegadores

## instalação do NodeJS no Linux Ubuntu (e derivados)
### Primerio instale o curl
```bash
sudo apt-get install curl
```
### Depois instalamos com os seguintes comandos
```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### Para testar se tudo ocorreu certo dê os seguintes comandos
```bash
node -v
npm -v
```
### Instalando o Yarn
```bash
sudo npm i --global yarn
```

## Executando o hello world
Para executar qualquer programa Node basta passar o seguinte comando
```bash
node [nome_do_arquivo]
```
E para executar o hello world
```bash
node Modulo01/HelloWorld.js
```
## Modulos do NodeJS
Módulos são fatias de um programa. Ou seja, é uma forma de de dividir sua aplicação em partes.
Modules precisam ser exportados com o comando *module.exports* e ser importado com *require('nome_do_arquivo')*
Também posso exportar multiplas funções usando um objeto
```javascript
function funcao01(){}
function funcao02(){}

module.exports = {
  funcao01,
  funcao02
}
```

## HTTP
É um protocolo de transferência de dados na web. Só é possível fazer uma comunicação cliente servidor graças ao http.
O protocola HTTP funciona através de requisições e respostas. (O cliente manda uma requisição e o servidor manda uma resposta)


## Express.js
É um framework para desenvolvimento web back end com NodeJS. Express é como uma caixa de ferramentas para desenvolver soluções beck end robustas e completas.

O node já vem com módulos que possibilitariam trabalhar sem um framework, mas seria muito mais trabalhoso. O Express facilita bastante o trabalho

## Iniciando um projeto usando ExpressJS
Para iniciar o um projeto com o Express dê o seguinte comando
```bash
npm init
# ou
yarn init
```
Será feito um questionário, você pode simplesmente dar enter para todas os campos. Ao fianl será criado um arquivo json com as configurações do projeto.
Depois instale o Express no projeto
```bash
npm i express --save
# ou
yarn add express
```

## (fugindo um pouco do curso) usando babel e ES6
Para usar import ao invés de require, além de outras features, decidi pesquisar como fazer.
primeiro vede instalar o cli do babel como dependência de desenvolvimento

```bash
npm i --save-dev babel-cli
# ou
yarn add babel-cli -D
```

Após isso basta instalar o preset adequaldo, também como dependência de desenvolvimento
```bash
npm i --save-dev babel-preset-2015
# ou
yarn add babel-preset-2015 -D
```

depois disso basta criar um arquivo chamado .babelrc e por a seguinte configuração
```json
{
  "presets": [
    "es2015"
  ]
}
```
## Estrutura inicial
```js
import express from 'express'
// sem babel
const express = require('express')

const app = express()

app.listen(3333, (err) => {
  if(err){
    console.log(`Ocorreu o erro: ${err}`);
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
})
```
  * Primeiro importamos o express.
  * Depois atribuímos o express à uma variável, a comunidade costuma dar o nome de APP.
  * Por ultimo iniciamos usando o método **listen** que recebe 2 parâmetros. Primeiro recebe a porta que irá funcionar e depois uma funcção de callback que tem como objetivo mostrar uma mensagem de sucesso ou de erro

## Rotas
Rotas são "caminhos" para determinadas páginas de uma palicação. Rotas são as URLS.

### Criação de rotas
Existem vários métodos para criar uma rota, como GET, POST, DELETE, etc, mas todos tem uma assinatura parecida
```js
app.get('\', (requisicao, resposta) => {
  resposta.send('Hello world!')
})
```
* Primeiro escolho o método(GET, POST, DELETE, etc);
* O primeiro parâmetro é o path, endereço da rota;
* Se eu usar "/"(barra) como caminho significa que é a página inicial da aplicação;
* o segundo parâmetro é uma função de callback que recebe 2 parâmetros, o primeiro é uma requisição e o segunda uma resposta. A requisição pegará algo do backend e a resposta mostrará o resultado.
* **IMPORTANTE**: Se criar uma rota e ela não tiver uma resposta irá carregar infinitamente, ou dar um erro.

## Carregamento automático
Para nossa aplicação recarregar automaticamente será usado o nodemon.

```bash
npm i --save-dev noedmeon
# ou
yarn add nodemon -D
```
Após isso para executar a aplicação com ES6 dê o seguinte comando
```bash
nodemon --exec babel-node index.js
```

**IMPORTANTE**: Para funcionar com ES6 é necessário instalar o bobel e o preset para o ES6

## Parâmetros
### Route params
Parâmetros de rota são formas de passar valores dinâmicos direto na sua rota.
**IMPORTANTE**: sempre que cirar uma rota com route params é necessário acessar ela com o parâmetro como se fosse parte do endereço.
Nas rotas criadas pelo express você usa o parâmetro de requisição para pegar os valores dos routes params.
```js
app.get('/ola/:nome', (request, response) => {
  const { nome } = request.params // Os parâmetros são um objeto
  response.send(`<h1>Olá, ${nome}!</h1>`)
})
```
Para tornar um route param opcional masta passar uma ?(interrogação) após o parâmetro
```js
app.get('/teste/:nome?', (requesicao, resposta) => {
  const name = requesicao.params.nome !== undefined? requesicao.params.nome: 'visitante'
  resposta.send(`<h1>Olá, ${name}</h1>`)
})
```
### Query params
Assim como os route params os query params são passados na rota, mas ao contrário dos route params os query params não são obrigatórios.
para passar um query param basta usar um ?(sinal de interrogação) ao final da rota seguido do nome e do valor.
```js
app.get('/canal', (request, response) => {
  const nome = request.query["nome"]

  if(nome){
    return response.send(`Seja bem-vindo ao canal ${nome}`)
  }
  return response.send('Seja bem-vindo')
})
```

### Body params(além do curso)
São parãmetros passados no corpo das páginas. São melhores para usar quando são muitos parâmetros e ficaria muito grande pela URL. Sempre usado no método POST
```js
app.post('/user/signup', (request, response) => {
  const {name, age, cpf} = request.body; // assim como route params é um objeto

  //inseri no bando

  return response.send('Usuário inserido com sucesso')
})