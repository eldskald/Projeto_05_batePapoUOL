
let usuarioNome;
let intervaloManterConexao;

const telaDeEntrada = document.querySelector(".entrada");
const inputNome = document.querySelector(".input-nome");
const mensagemDeErro = document.querySelector(".mensagem-de-erro");
const spinner = document.querySelector(".carregando");
const divEntrar = document.querySelector(".entrar");



// Funções que lidam com a entrada no chat
inputNome.onkeypress = (event) => {
    const tecla = event.keyCode;
    if (tecla === 13) {
        entrarNoChat();
    }
}

function entrarNoChat () {
    spinner.classList.remove("desativado");
    divEntrar.classList.add("desativado");
    const dados = {name: inputNome.value};
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", dados);
    requisicao.then(sucessoEntrar);
    requisicao.catch(falhaEntrar);
}

function sucessoEntrar () {
    spinner.classList.add("desativado");
    divEntrar.classList.remove("desativado");
    mensagemDeErro.innerHTML = "";
    telaDeEntrada.classList.add("desativado");
    usuarioNome = inputNome.value;
    intervaloManterConexao = setInterval(manterConexao, 5000);
    inicializarChat();
}

function falhaEntrar (erro) {
    spinner.classList.add("desativado");
    divEntrar.classList.remove("desativado");
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
    requisicao.catch(falhaManter);
}

function falhaManter () {
    mensagemDeErro.innerHTML = "Conexão perdida!"
    telaDeEntrada.classList.remove("desativado");
    clearInterval(intervaloManterConexao);
}
// Funções que lidam com a manutenção de conexão no chat
