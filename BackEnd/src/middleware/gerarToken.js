//importação do módulo jsonwebtoken
const jwt = require("jsonwebtoken");

//Criação do token de sessão para autorização de rotas
//Esse token será criado todas as vezes que o usuário logar no sistema
function gerarToken(id, usuario, email) {
    return jwt.sign(
      { idusuario: id, nomeusuario: usuario, email: email },
      "informatica",
      { expiresIn: "1d" }
    );
  }

  //Expor o módulo de gerarToken para todo o projeto 
  module.exports = gerarToken; 