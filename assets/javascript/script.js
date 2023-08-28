function verificarInputs() {
    let titulo = document.getElementById("input-titulo").value;
    let preco = document.getElementById("input-preco").value;
    let descricao = document.getElementById("input-descricao").value;
    let imgLink = document.getElementById("input-imgLink").value;
    let plataforma = document.getElementById("input-plataforma").value;
    console.log(titulo);
    console.log(preco);
    console.log(descricao);
    console.log(imgLink);
    console.log(plataforma);
    if (titulo == "" || preco == "" || descricao == "" || imgLink == "" || plataforma == "") {
        envieMsg("preencha todos os campos", "erro");
        return true;
    }
    else {
        envieMsg("jogo cadastrado", "sucesso");
        return false;
    }
}
function envieMsg(msg, tipoMsg) {
    let msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = '';
    let msgParaTela = `
    <p class = "${tipoMsg}">${msg}</p>
    `
    msgDiv.innerHTML = msgParaTela;
    setTimeout(function () {
        msgDiv.innerHTML = '';
    }, 3000)
}
class Jogo {
    constructor(titulo, preco, descricao, plataforma, imgLink, id) {
        this.titulo = titulo;
        this.preco = preco;
        this.descricao = descricao;
        this.plataforma = plataforma;
        this.imgLink = imgLink;
        this.id = this.generateID()
    }
    generateID(){
        return Math.floor(Math.random()* 1000);
    }
}

function comporJogo() {
    let titulo = document.getElementById("input-titulo").value;
    let preco = document.getElementById("input-preco").value;
    let descricao = document.getElementById("input-descricao").value;
    let imgLink = document.getElementById("input-imgLink").value;
    let plataforma = document.getElementById("input-plataforma").value;
    const jogo = new Jogo(titulo, preco, descricao, plataforma,imgLink);
    const id = jogo.generateID()
    console.log(jogo);
    BibliotecaJogos.adicionar(jogo);
    console.log(BibliotecaJogos);
    renderizarConteudo();
}
class ListaJogos {
    constructor() {
        this.ListaJogosArray = [];
    }
    adicionar(parametro){
        if  (verificarInputs()) {
            envieMsg("preencha todos os campos", "erro")
        }
        else if (!isURLValida(parametro.imgLink)){
            envieMsg("URL da imagem inválida!", "error"); 
      
        }
        else {
            this.ListaJogosArray.push(parametro);
        limparImputs();
        }
    }
    removerJogos(id){
        this.ListaJogosArray = this.ListaJogosArray.filter(jogo => jogo.id != id);
    }
}
const ListaTeste = new ListaJogos();
// console.log(ListaTeste);
const BibliotecaJogos = new ListaJogos();
console.log(BibliotecaJogos);
function limparImputs() {
    document.getElementById('input-titulo').value = "";
    document.getElementById('input-preco').value = "";
    document.getElementById('input-descricao').value = "";
    document.getElementById('input-imgLink').value = "";
    document.getElementById('input-plataforma').value = "";
}
console.clear();
function renderizarConteudo() {
    const listaHTML = document.getElementById("gameList");
    listaHTML.innerHTML = "";
    let array = BibliotecaJogos.ListaJogosArray;
    array.forEach(jogo => {
        const jogoDiv = `
        <div class = 'jogoDetalhe'>
        <p>Titulo: ${jogo.titulo}</p>
        <p>Preço: ${jogo.preco}</p>
        <p>Descrição: ${jogo.descricao}</p>
        <p>Plataforma: ${jogo.plataforma}</p>
        <img src ="${jogo.imgLink}" alt="${jogo.titulo}">
        <button id="bb1" class="button" onclick="remover(${jogo.id})">Remover</button>
        </div>
        `;
        listaHTML.innerHTML += jogoDiv;
    });
}
function remover(id){
    BibliotecaJogos.removerJogos(id)
renderizarConteudo()
}
function isURLValida(url) {
    if(url.match(/\.(jpeg|jpg|gif|png)$/) != null){
        return true;
    } else {
        return false;
    }
}