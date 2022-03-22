const server = "http://localhost:5000";

function efetuarLogin(){

    var data = window.location.search.split("&");
    
    dt = data[0].substring(1);
    var preco = data[1].substring(3);
    var tratamento = data[2].substring(3);
    console.log(preco);
    const usuario = document.getElementById("txtUsuarioLogin");
    const senha = document.getElementById("txtSenhaLogin");

    if (usuario.value == "" || senha.value.trim() == "") {
        alert("Usuário pou senha não podem ficar em branco");
        return;
    }
// Estabelecer a comunicação com a API
fetch(`${server}/usuarios/login`,{
    method:"POST",
    headers:{
        accept:"application/json",
        "content-type":"application/json"

    },
    body:JSON.stringify({
         nomeusuario:usuario.value,
         senha:senha.value
    })
}).then((response)=>response.json())
.then((dados)=>{
    if (dados.retorno != "Logado"){
        alert(dados.retorno);
        return;
    }
    window.location.replace(`pagamento.html?${dados.token}& ${data}& ${preco}& ${tratamento}`)
})
.catch((erro)=>console.error(`Erro ao carregar a API -> ${erro} `));

}

function efetuarLoginRestrito(){

    const usuario = document.getElementById("txtUsuarioLogin");
    const senha = document.getElementById("txtSenhaLogin");

    if (usuario.value == "" || senha.value.trim() == "") {
        alert("Usuário pou senha não podem ficar em branco");
        return;
    }
// Estabelecer a comunicação com a API
fetch(`${server}/usuarios/login`,{
    method:"POST",
    headers:{
        accept:"application/json",
        "content-type":"application/json"

    },
    body:JSON.stringify({
         nomeusuario:usuario.value,
         senha:senha.value
    })
}).then((response)=>response.json())
.then((dados)=>{
    if (dados.retorno != "Logado"){
        alert(dados.retorno);
        return;
    }
    window.location.replace(`home.html?${dados.token}`)
})
.catch((erro)=>console.error(`Erro ao carregar a API -> ${erro} `));

}
function gravarUsuario(){
    var nome = document.getElementById("txtNome");
    var email = document.getElementById("txtEmail");
    var cpf = document.getElementById("txtCPF");
    var usuario = document.getElementById("txtUsuario");
    var senha = document.getElementById("txtSenha");
    var confirma = document.getElementById("txtConfirma");
    var foto = document.getElementById("txtFoto");
    
    if(nome.value.trim()=="" ||
       email.value.trim()=="" ||
       cpf.value.trim()=="" ||
       usuario.value.trim()=="" ||
       senha.value.trim()=="" ||
       confirma.value.trim()=="" ||
       foto.value.trim()==""){
           alert("Você deve preencher todos os campos");
           return;
       }

       if(senha.value != confirma.value){
           alert("Você deve confirmar a senha digitando a mesma");
           return;
       }
    
    fetch("http://localhost:5000/usuarios/cadastrar",{
        method:"POST", 
        headers:{
            accept:"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomeusuario:usuario.value,
            senha:senha.value,
            nomecompleto:nome.value,
            email: email.value,
            cpf:cpf.value,
            foto: foto.value
        })
    })
    
    .then((response)=>response.json())
    .then((dados)=>{
        alert(`Usuário cadastrado. Seu id é: ${dados.retorno.insertId} - Agora você deve efetuar o login`);
        //Limpar o formulário
        nome.value = "";
        email.value = "";
        cpf.value = "";
        usuario.value = "";
        senha.value = "";
        confirma.value = "";
        foto.value = "";
        // Atualizar a tela 
        window.location.reload();
    })
    .catch((erro)=>console.error(`Erro ao tentar cadastrar na API -> ${erro}`))
    }

function carregarProdutosHome(){
    
    var token = window.location.search.substring(1);
    fetch("http://localhost:5000/produtos/listar")
    .then((response)=>response.json())
    .then((dados)=>{
        
       var saida ="";
        
       dados.retorno.map((itens,indice)=>{
        
           saida+=`<a target="blank">
           <div class="box_cartoes flex">

           </div>
           <div class="conteudo_cartoes">
           
           <div class="card-body">
           <img src=/Users/luciana.famartins/Desktop/Luciana/08-03-2022/FrontEnd/Imagem/${itens.foto1} class="card-img-top" alt="...">    
           <h3 align=justify>${itens.nomeproduto}</h3>
           <p align=justify>${itens.descricao}</p>
           <p align=center>R$${itens.preco},00</p>
           <p align=center>
           Reserve seu horário
           <input type="datetime-local" name="" id=agenda${indice}>
           </p>
           <br>
           <p align=center>
           <a id="btn_agendar" onclick=agendar(${indice},${itens.preco},"${itens.nomeproduto}")>Agendar</a></p>
           </div>
           </div>
       </a>
           

`
       })  
        
        document.getElementById("conteudo").innerHTML=saida;
    })
.catch((erro)=>console.error(`Erro ao carregar a API com produtos -> ${erro}`))
}

function agendar(indice,preco,nomeproduto){
    var data=document.getElementById(`agenda${indice}`);
    window.location.replace(`login.html?data=${data.value}& ${preco}& ${nomeproduto}`);


}

function carregarProdutosRestrito(){
    
    var token = window.location.search.substring(1);
    fetch("http://localhost:5000/produtos/listar")
    .then((response)=>response.json())
    .then((dados)=>{
        
       var saida ="";
        
       dados.retorno.map((itens)=>{
        
           saida+=`<a target="blank">
           <div class="box_cartoes flex">

           </div>
           <div class="conteudo_cartoes">
           
           <div class="card-body">
           <img src=/Users/luciana.famartins/Desktop/Luciana/08-03-2022/FrontEnd/Imagem/${itens.foto1} class="card-img-top" alt="...">    
           <h3 align=justify>${itens.nomeproduto}</h3>
           <p align=justify>${itens.descricao}</p>
           <p align=center>R$${itens.preco},00</p>
           <p align=center>
           <a href="atualizar.html?id=${itens.idproduto}&token=${token}" class="card-link" id="btn_atualizar">Atualizar</a>
           <br>
           <br>
           <a href="apagar.html?id=${itens.idproduto}" class="card-link" id="btn_apagar">Apagar</a></p>
         </div>

           </div>
       </a>
           

`
       })  
        
        document.getElementById("conteudo").innerHTML=saida;
    })
.catch((erro)=>console.error(`Erro ao carregar a API com produtos -> ${erro}`))
}

function efetuarCadastroProduto(){
    var nome = document.getElementById("txtProduto");
    var descricao = document.getElementById("txtDescricao");
    var preco = document.getElementById("txtPreco");
    var foto1 = document.getElementById("txtFoto1");
    var foto2 = document.getElementById("txtFoto2");
    var foto3 = document.getElementById("txtFoto3");
    var token = window.location.search.substring(1);
    
    fetch("http://localhost:5000/produtos/cadastrar",{
        method:"POST",
        headers:{
            accept:"application/json",
            "content-type":"application/json",
            token:token
        },
        body:JSON.stringify({
            nomeproduto:nome.value, 
            descricao:descricao.value, 
            preco:preco.value, 
            foto1:foto1.value, 
            foto2:foto2.value, 
            foto3:foto3.value 
        })
        
    })
    .then((response)=>response.json())
    .then((rs)=>{
        console.log(rs);
    })
    .catch((erro)=>console.error(`Erro ao tentar carregar a API -> ${erro}`))
}

function efetuarAtualizacaoProduto(){
 
    var nome = document.getElementById("txtProduto");
    var descricao = document.getElementById("txtDescricao");
    var preco = document.getElementById("txtPreco");
    var foto1 = document.getElementById("txtFoto1");
    var foto2 = document.getElementById("txtFoto2");
    var foto3 = document.getElementById("txtFoto3");
    var id = window.location.search.split('&');
    var token = id[1].substring(6);
    id = id[0].substring(4);
    
    fetch(`http://localhost:5000/produtos/atualizar/${id}`,{
        method:"PUT",
        headers:{
            accept:"application/json",
            "content-type":"application/json",
            token:token
        },
        body:JSON.stringify({
            nomeproduto:nome.value, 
            descricao:descricao.value, 
            preco:preco.value, 
            foto1:foto1.value, 
            foto2:foto2.value, 
            foto3:foto3.value 
        })
        
    })
    .then((response)=>response.json())
    .then((rs)=>{
        console.log(rs);
        alert ("Tratamento atualizado com sucesso!");
        window.location.href="home.html";
    })
    .catch((erro)=>console.error(`Erro ao tentar carregar a API -> ${erro}`))

        
}
function apagarProduto(){
 
    var id = window.location.search.substring(4);
    console.log(id);
    
    fetch(`http://localhost:5000/produtos/delete/${id}`,{
        method:"DELETE",
        headers:{
            accept:"application/json",
            "content-type":"application/json",
        },
        
    })
    .then((response)=>response.json())
    .then((rs)=>{
        console.log(rs);
        alert ("Tratamento apagado com sucesso!");
        window.location.href="home.html";
    })
    .catch((erro)=>console.error(`Erro ao tentar carregar a API -> ${erro}`))
}

function carregarProdutoParaAtualizar(){
     var id = window.location.search.split('&');
     id = id[0].substring(4);
    
    fetch(`http://localhost:5000/produtos/buscar/${id}`)
    .then((response)=>response.json())
    .then((dados)=>{
    document.getElementById("txtProduto").value = dados.retorno[0].nomeproduto;
    document.getElementById("txtDescricao").value = dados.retorno[0].descricao;
    document.getElementById("txtPreco").value = dados.retorno[0].preco;
    document.getElementById("txtFoto1").value = dados.retorno[0].foto1;
    document.getElementById("txtFoto2").value = dados.retorno[0].foto2;
    document.getElementById("txtFoto3").value = dados.retorno[0].foto3;
 })
    .catch((erro)=>console.error(erro))
}

function carregarListaProdutos(){
    
    var saida = "";
    
    fetch("http://localhost:5000/produtos/listar")
    .then((response)=>response.json())
    .then((dados)=>{
        dados.retorno.map((itens)=>{
            saida+=`<div col-12>
                     <p>Id do Produto: ${itens.idproduto}</p>
                     <p>Nome do Produto: ${itens.nomeproduto}</p>
                     <p>Descrição: ${itens.descricao}</p>
                     <p>Preço: ${itens.preco}</p>
                     <p>Foto 1: ${itens.foto1}</p>
                     <p>Foto 2: ${itens.foto2}</p>
                     <p>Foto 3: ${itens.foto3}</p>
                     </div>`;
        })
        
        document.getElementById("conteudo").innerHTML = saida;
        
    }).catch((erro)=>console.error(erro))
}

function carregarUltimosPedidos(){
    fetch("http://localhost:5000/pedidos/listar")
    .then((response) => response.json())
    .then((dados)=>{
        
        var saida = "";
        
        dados.retorno.map((itens)=>{
            saida += `<div>
                  <p>Número do pedido: ${itens.idpedido}</p>
                  <p>Nome do Cliente: ${itens.nomecompleto}</p>
                  <p>Nome do Produto: ${itens.nomeproduto}</p>
                  <p>Quantidade: ${itens.quantidade}</p>
                  <p>Data do pedido: ${itens.datahora}</p>
                  </div>
`
        })
        document.getElementById("conteudo").innerHTML = saida;
    }).catch((erro)=>console.error(erro))
}

function buscarPorId(){
    
    var id = document.getElementById("txtIdPedido").value;
    
    fetch(`http://localhost:5000/pedidos/buscar/${id}`)
    .then((response) => response.json())
    .then((dados)=>{
        
        var saida = "";
        
        dados.retorno.map((itens)=>{
            saida += `<div>
                  <p>Número do pedido: ${itens.idpedido}</p>
                  <p>Nome do Cliente: ${itens.nomecompleto}</p>
                  <p>Nome do Produto: ${itens.nomeproduto}</p>
                  <p>Quantidade: ${itens.quantidade}</p>
                  <p>Data do pedido: ${itens.datahora}</p>
                  </div>
`
        })
        document.getElementById("conteudo").innerHTML = saida;
    }).catch((erro)=>console.error(erro))
}

function efetuarCadastroAgendamento(){
    if(confirm("Ao efetuar o agendamento você irá confirmar o pagamento deseja continuar?")==0){

    var agendamento = document.getElementById("txtAgendamento");
    var preco = document.getElementById("txtPreco");
    var total = document.getElementById("txtTotal");
    var tipo = document.getElementById("txtTipo");
    var detalhe = document.getElementById("txtDetalhe");
    var nparcela = document.getElementById("txtNparcela");
    var vparcela = document.getElementById("txtVparcela");
    var token = window.location.search.substring(1);
    
    fetch("http://localhost:5000/pagamentos/cadastrar",{
        method:"POST",
        headers:{
            accept:"application/json",
            "content-type":"application/json",
            token:token
        },
        body:JSON.stringify({
            agendamento:agendamento.value, 
            preco:preco.value, 
            total:total.value, 
            tipo:tipo.value, 
            detalhe:detalhe.value, 
            nparcela:nparcela.value,
            vparcela:vparcela.value  
        })
        
    })
    .then((response)=>response.json())
    .then((rs)=>{
        console.log(rs);
        alert ("Pagamento efetuado com sucesso!");
    })
    .catch((erro)=>console.error(`Erro ao tentar carregar a API -> ${erro}`))
    }
}
