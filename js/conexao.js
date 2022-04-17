
let usuarioNome;
let requisicaoChecagem;

const telaDeEntrada = document.querySelector(".entrada");
const inputNome = document.querySelector(".input-nome");
const mensagemDeErro = document.querySelector(".mensagem-de-erro");



// Funções que lidam com a entrada no chat
function pegarNome () {
    const dados = {name: inputNome.value};
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", dados);
    requisicao.then(sucessoEntrar);
    requisicao.catch(falhaEntrar);
}

function sucessoEntrar () {
    mensagemDeErro.innerHTML = "";
    telaDeEntrada.classList.add("desativado");
    usuarioNome = inputNome.value;
    requisicaoChecagem = setInterval(manterConexao, 5000);
}

function falhaEntrar (erro) {
    const codigo = erro.response.status;
    if (codigo === 400) {
        mensagemDeErro.innerHTML = "Nome indisponível!";
    }
}
// Funções que lidam com a entrada no chat



// Funções que lidam com a manutenção de conexão no chat
function manterConexao () {
    const dados = {name: inputNome.value};
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", dados);
    requisicao.then(sucessoManter);
    requisicao.catch(falhaManter);
}

function sucessoManter () {
    alert("brabo d+");
}

function falhaManter () {
    mensagemDeErro.innerHTML = "Conexão perdida!"
    telaDeEntrada.classList.remove("desativado");
}
// Funções que lidam com a manutenção de conexão no chat
