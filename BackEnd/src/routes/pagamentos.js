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
Rotas para realizar as seguintes operações no pagamento
  - /usuario/:id -> Listar os pagamentos relacionados a um usuário                Verbo GET
  - /pedido/:id -> Listar os pagamentos relacionados a um pedido                  Verbo GET
  - /cadastrar -> Cadastro do pagamento de um pedido                              Verbo POST

*/

router.get("/usuario/:id", verificaToken, (req, res) => {
    conexao.query(
      "SELECT * FROM pagamento WHERE idusuario=?",
      [req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  router.get("/pedido/:id", verificaToken, (req, res) => {
    conexao.query(
      "SELECT * FROM pagamento WHERE idpedido=?",
      [req.params.id],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
        res.status(200).send({ retorno: resultado });
      }
    );
  });
  
  router.post("/cadastrar", (req, res) => {
    conexao.query(
      "INSERT INTO pedido SET idusuario=?",
      [req.body.idusuario],
      (erro, resultado) => {
        if (erro)
          return res.status(500).send({ retorno: `Erro interno ->${erro}` });
          conexao.query(
            `INSERT INTO pagamento SET idusuario=?,
            idpedido=?,formapagamento=?,detalhespagamento=?,
            valortotal=?,numeroparcelas=?,valorparcelas=?`,
            [req.body.idusuario,
              resultado.insertId,
              req.body.tipo,
              req.body.detalhe,
              req.body.total,
              req.body.nparcela,
              req.body.vparcela
            ],(err,dado)=>{
              if(err) return res.status(500).send({ retorno:`Erro interno -> ${err}`})


            }
          )
          res.status(201).send({ retorno: "Pagamento Efetuado" });
      }
    );
  });

  //Expor o módulo de usuário para todo o projeto 
  module.exports = router; 