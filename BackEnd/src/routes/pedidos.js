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
Rotas para o pedido 
  - /buscar/:id -> Localizar pedido específico                  Verbo GET
  - /usuario/:id -> Localizar os pedidos do usuario             Verbo GET
  - /cadastrar -> Realizar o cadastro do pedido                 Verbo POST
*/
router.get("/buscar/:id", (req, res) => {
    conexao.query(
      `select pe.idpedido, 
      us.nomecompleto,
      pr.nomeproduto,
      it.quantidade, 
      pe.datahora
      
      from pedido pe inner join usuario us
      on pe.idusuario = us.idusuario inner join
      itenspedido it on pe.idpedido = it.idpedido
      inner join produto pr on pr.idproduto = it.idproduto 
      
      where pe.idpedido=?

      order by pe.idpedido desc limit 0,5;`,
      [req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  router.get("/usuario/:id", verificaToken, (req, res) => {
    conexao.query(
      "SELECT * FROM pedido WHERE idusuario=?",
      [req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  router.post("/cadastrar", verificaToken, (req, res) => {
    conexao.query("INSERT INTO pedido SET ?", [req.body], (erro, resultado) => {
      if (erro)
        return res.status(500).send({ retorno: `Erro interno ->${erro}` });
      res.status(201).send({ retorno: resultado });
    });
  });

  router.get("/listar", (req, res) => {
    conexao.query(
      `select pe.idpedido, 
      us.nomecompleto,
      pr.nomeproduto,
      it.quantidade, 
      pe.datahora
      
      from pedido pe inner join usuario us
      on pe.idusuario = us.idusuario inner join
      itenspedido it on pe.idpedido = it.idpedido
      inner join produto pr on pr.idproduto = it.idproduto 
      
      order by pe.idpedido desc limit 0,5;`,

      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });

  //Expor o módulo de usuário para todo o projeto 
  module.exports = router; 