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
```
## Curso bonus de mysql
### instalar o Mysql no docker e usando no DBeaver
**IMPORTANTE** usarei o mysql rodando em um container
```bash
docker run --name=mysqlCourse -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -v ~/home/israel/Desktop/mysqlCourse:/var/lib/mysql mysql:5.7
```
**O mysql estará rodando na porta 3306**
```bash
# Para descobrir o ID do contianer
docker container ls # mostrará todos os contaienrs sendo executados
# Pra descobrir o IP do container
docker container inspect # IP do contiaqner
```
Com o IP e a porta bas clicar em adicionar nova conexão no DBeaver e trocar localhost pelo IP do container

### Conseitos
* **Entidade**: Algo de interesse para a comunidade de usuários do banco de dados. Exemplos incluem clientes, partes, localizações geográficas etc.
* **Coluna**: Um dado armazenado em uma tabela
* **Linha**: Um conjunto de colunas que, coletivamente descreve de forma completa uma entidade ou alguma ação em uma entidade. Também chamada de **registro**.
* **Tabela**: Um conjunto de linhas, mantidas em memória volátil (não-persistente) ou em armazenamento permanente (persistente).
* **Conjunto-resultado**: Outro nome para uma tabela não-persistente, geralmente o resultado de uma consulta SQL.
* **Chave primária**: Uma ou mais colunas que podem ser usadas como identificadorúnico de cada linhas em uma tabela.
* **Chave estrangeira**: Uma ou mais colunas que podem ser usadas em conjunto para identicar uma única linha em outra tabela.

### Tipos de dados do MysQL
* **Tipo caractere**: CHAR, CHARSET
* **Tipo texto**: TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT
* **Tipo númerico**: TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT,  FLOAT, DOUBLE
* **Tipo temporal**: DATE, DATETIME, TIMESTAMP, YEAR, TIME

### Manipulando as tabelas

#### Criação de tabela

```sql
CREATE TABLE users( -- Primeiro declara o nome da tabebela
	id INT PRIMARY KEY AUTOINCREMENT, -- Depois passa os nomes e tipos das colunas dentro de parenteses
	name VARCHAR(50),
	email VARCHAR(100),
	age INT
); -- Ao final do comando fecha com ;(ponto e vírgula)
```

#### Insersão de dados

```sql
INSERT INTO users ( name, email, age ) -- A tabela onde os dados serão inseridos e os campos
VALUES( -- Valores na mesma ordem listada
    "Fulano",
    "Fulano@email.com",
    26
);
```

#### Seleção (busca)

```sql
SELECT name, -- Os campos que serão consultados
	email,
	age
FROM users -- Tabela de onde serão buscados
WHERE name = "Fulano" -- COndição, mas não é obrigatória

-- consulta buscanto TODOS as colunas
SELECT * FROM users
WHERE name = "Ciclano"
```

#### Deletar dados

```sql
DELETE FROM users -- Tabela de onde será removido os dados
WHERE name = "Ciclano" -- Condição
/* IMPORTANTE se não colocar a clausula WHERE todos os dados serão deletados */
```

#### Atulização/Modificação de informações

```sql
UPDATE users -- Tabela onde será feio a ataulização
SET name = "Fulano da Silva" -- Campo que será atualizado
WHERE id = 1 -- Condição
/* IMPORTANTE se não passar uma condição todos os dados do campo na tabela serão modificados */
```

