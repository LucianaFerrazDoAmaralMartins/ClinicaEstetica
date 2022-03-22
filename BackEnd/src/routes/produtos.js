//importação do módulo express
const express = require("express");

//importação do módulo de conexao com banco de dados 
const conexao = require("../data/conexao");

//importação do módulo veificaToken 
const verificaToken = require("../middleware/verificaToken");

//Vamos usar uma função para definir que iremos fazer 
//deste arquivo um objeto de rota 
const router = express.Router();


// Para o produto teremos as seguintes rotas:
/*
  - listar -> Listar  todos os produtos cadastrados                   Verbo GET
  - buscar/:id -> Buscar um produto por id                            Verbo GET
  - cadastrar -> Cadastrar o produto                                  Verbo POST
  - atualizar/:id -> Atualizar o produto usando o id                  Verbo PUT
*/

router.get("/listar", (req, res) => {
    conexao.query(
      "SELECT * FROM produto ORDER BY idproduto DESC",
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  router.get("/buscar/:id", (req, res) => {
    conexao.query(
      "SELECT * FROM produto WHERE idproduto=? ORDER BY idproduto DESC",
      [req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  router.post("/cadastrar", verificaToken, (req, res) => {
    conexao.query("INSERT INTO produto SET ?", [req.body], (erro, resultado) => {
      if (erro)
        return res.status(500).send({ retorno: `Erro interno ->${erro}` });
      res.status(201).send({ retorno: resultado });
    });
  });
  
  router.put("/atualizar/:id", verificaToken, (req, res) => {
    conexao.query(
      "UPDATE produto SET ? WHERE idproduto=?",
      [req.body, req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });

  router.delete("/delete/:id", (req, res) => {
    conexao.query(
      "DELETE from produto WHERE idproduto=?",
      [req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  //Expor o módulo de usuário para todo o projeto 
  module.exports = router; 