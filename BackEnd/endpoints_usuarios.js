//importação do módulo express
const express = require("express");

//importação do módulo veificaToken 
const verificaToken = require("./src/middleware/verificaToken");

//importação do módulo que gera o token
const gerarToken = require("./src/middleware/gerarToken");

//importação do módulo do bcrypt
const bcrypt = require("bcrypt");

//importação do módulo de conexao com banco de dados 
const conexao = require("./src/data/conexao");

//Vamos usar uma função para definir que iremos fazer 
//deste arquivo um objeto de rota 
const router = express.Router();

/*
Vamos construir todas as rotas para o crud do usuário, ou seja, iremos criar caminhos(rotas)
com pontos definidos para cada ação. Esses pontos são os endpoints. Portanto teremos:
    -> listar usuarios => /listar                      ->verbo GET
    -> cadastrar usuario => /cadastrar                  ->verbo POST
    -> login => /login                                  ->verbo POST
    -> logout => /logout                                ->verbo GET
    -> atualizarsenha => /alterarsenha/:nomeusuario     ->verbo PUT
    -> atualizarfoto => /alterarfoto/:id                ->verbo PUT
*/

router.get("/listar", (req, res) => {
    conexao.query("SELECT * FROM usuario", (erro, dados) => {
      if (erro) return res.status(500).send({ retorno: `Erro -> ${erro}` });
  
      res.status(200).send({ retorno: dados });
    });
  });
  
router.post("/cadastrar", (req, res) => {
    bcrypt.hash(req.body.senha, 10, (erro, resultado) => {
      if (erro)
        return res
          .status(500)
          .send({ retorno: `Erro ao gerar a senha->${erro}` });
  
      req.body.senha = resultado;
  
      conexao.query("INSERT INTO usuario set ?", [req.body], (erro, dados) => {
        if (erro) return res.status(500).send({ retorno: `Erro -> ${erro}` });
  
        res.status(201).send({ retorno: dados });
      });
    });
  });
  
router.post("/login", (req, res) => {
    conexao.query(
      "SELECT * FROM usuario WHERE nomeusuario=?",
      [req.body.nomeusuario],
      (erro, dados) => {
        if (erro) return res.status(500).send({ retorno: `Erro -> ${erro}` });
  
        if (dados == null)
          return res.status(404).send({ retorno: `Usuário ou senha incorreto` });
  
        bcrypt.compare(req.body.senha, dados[0].senha, (erro, igual) => {
          if (erro)
            return res.status(500).send({ retorno: `Erro interno -> ${erro}` });
          if (!igual) return res.status(400).send({ retorno: `Senha incorreta` });
  
          var gerado = gerarToken(
            dados[0].idusuario,
            dados[0].nomeusuario,
            dados[0].email
          );
  
          //Chamar a função que grava os dados de acesso do usuário
          gravarAcesso(dados[0].idusuario, JSON.stringify(req.headers));
  
          res.status(200).send({ retorno: "Logado", token: gerado });
        });
      }
    );
  });
  
router.get("/logout", verificaToken, (req, res) => {
    conexao.query(
      "update acesso set datahoralogout=now() where idusuario=? order by idacesso desc limit 1",
      [req.content.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno -> ${erro}` });
        res.status(200).send({ retorno: "Logout" });
      }
    );
  });
  
router.put("/alterarsenha/:nomeusuario", (req, res) => {
    bcrypt.hash(req.body.senha, 10, (erro, resultado) => {
      if (erro)
        return res
          .status(500)
          .send({ retorno: `Erro ao tentar atualizar->${erro}` });
      req.body.senha = resultado;
      conexao.query(
        "UPDATE usuario set senha=? where nomeusuario=?",
        [req.body.senha, req.params.nomeusuario],
        (erro, dados) => {
          if (erro)
            return res
              .status(500)
              .send({ retorno: `Erro ao tentar atualizar -> ${erro}` });
  
          if (dados == null || dados == "")
            return res.status(404).send({ retorno: `Usuário não localizado` });
          res.status(200).send({ retorno: dados });
        }
      );
    });
  });
  
router.put("/atualizarfoto/:id", verificaToken, (req, res) => {
    conexao.query(
      "UPDATE usuario SET foto=? WHERE idusuario=?",
      [req.body.foto, req.params.id],
      (erro, dados) => {
        if (erro)
          return res
            .status(500)
            .send({ retorno: `Erro ao tentar atualizar -> ${erro}` });
  
        if (dados == null || dados == "")
          return res.status(404).send({ retorno: `Usuário não localizado` });
  
        res.status(200).send({ retorno: dados });
      }
    );
  });

  //Criar a função gravarAcesso. Esta função grava as informações do usuário quando ele
//realiza a autenticação.
function gravarAcesso(id, dados) {
    conexao.query(
      "INSERT INTO acesso SET idusuario=?, dados=?",
      [id, dados],
      (erro, resultado) => {
        if (erro) {
          console.log(`Erro interno->${erro}`);
          return;
        }
      }
    );
  }

  //Expor o módulo de usuário para todo o projeto 
  module.exports = router; 