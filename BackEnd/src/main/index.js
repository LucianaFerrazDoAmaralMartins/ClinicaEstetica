/*
Projeto backend para uma aplicação comercial. 
Vamos usar módulos para executar nosso projeto.
*/
//importação do módulo express
const express = require("express");

//importação do módulo cors
const cors = require("cors");

//Vamos utilizar o módulo express aplicando em uma constante chamada app
const app = express();

//Aplicar ao servidor o trabalho de trato com os dados no formato JSON
app.use(express.json());

//Aplica o CORS no projeto. Uso de protocolos diferentes(http, https..)
app.use(cors());

//Importação e execução da documentação do swagger online

const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("../../swagger_output.json");

app.use("/docprojeto",swaggerUI.serve,swaggerUI.setup(swaggerFile));
require("../../endpoints_usuarios");

//Importar as rotas dos objetos 
const rotaUsuarios = require("../routes/usuarios");
const rotaProdutos = require("../routes/produtos");
const rotaPedidos = require("../routes/pedidos");
const rotaItens = require("../routes/itenspedido");
const rotaPagamentos = require("../routes/pagamentos");

//Usando as rotas na nossa aplicação
app.use("/usuarios",rotaUsuarios);
app.use("/produtos",rotaProdutos);
app.use("/pedidos",rotaPedidos);
app.use("/itens",rotaItens);
app.use("/pagamentos",rotaPagamentos);

//definindo a porta de comunicação do servidor
//Carregar a porta de comunicação definida no ambiente do servidor 
app.listen(process.env.PORT || 5000, () =>
  console.log(`Servidor online em http://localhost:${process.env.PORT || 5000}`)
);
