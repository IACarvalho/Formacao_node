# FOrmação NodeJS

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
### Para testar se tuco ocorreu certo dê os seguintes comandos
```bash
node -v
npm -v
```
### Instaladno o Yarn
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
Módulos são fatias de um programa. Ou seja, é uma forma de de vividir sua aplicação em partes.
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