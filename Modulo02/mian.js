var http = require('http');

http.createServer((req, resp) => {
  resp.end("Bem vindo ao meu site")
}).listen(8181);
console.log('Meu servidor está rodando');