//importação do módulo express
const express = require("express");

//importação do módulo de conexao com banco de dados 
const conexao = require("../data/conexao");

//importação do módulo veificaToken 
const verificaToken = require("../middleware/verificaToken");

//Vamos usar uma função para definir que iremos fazer 
//deste arquivo um objeto de rota 
const router = express.Router();

/*
Rotas para o itenspedido
  - /pedido/:id -> Listar todos os produtos de um pedido                Verbo GET
  - /cadastrar -> Cadastrar os itens de pedido                          Verbo POST
  - /atualizar/quantidade/:id -> Atualizar a quantidade de um produto   Verbo PUT
  - /apagar/:id -> Apaga itenspedido                                    Verbo DELETE
*/
router.get("/pedido/:id", verificaToken, (req, res) => {
    conexao.query(
      "SELECT * FROM itenspedido WHERE idpedido=?",
      [req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  router.post("/cadastrar", verificaToken, (req, res) => {
    conexao.query(
      "INSERT INTO itenspedido SET ?",
      [req.body],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(201).send({ retorno: resultado });
      }
    );
  });
  
  router.put("/atualizar/quantidade/:id", verificaToken, (req, res) => {
    conexao.query(
      "UPDATE itenspedido SET ? WHERE iditens=?",
      [req.body, req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  router.delete("/apagar/:id", verificaToken, (req, res) => {
    conexao.query(
      "DELETE FROM itenspedido WHERE idpedido=?",
      [req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(204).send({ retorno: resultado });
      }
    );
  });

  //Expor o módulo de usuário para todo o projeto 
  module.exports = router; 