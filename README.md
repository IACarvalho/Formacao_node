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