
let mandandoPara = "Todos";
let visibilidade = "Pública";

const menuFundo = document.querySelector(".participantes");
const menuLayout = document.querySelector(".participantes-menu");
const menuLista = document.querySelector(".participantes-lista");

// Funções de abrir e fechar o menu
function abrirMenu () {
    menuFundo.classList.remove("desativado");
    menuLayout.classList.remove("desativado");
    setTimeout(animarAbertura, 10);
}

function animarAbertura () {
    menuFundo.classList.remove("desativando");
    menuLayout.classList.remove("desativando");
}

function fecharMenu () {
    menuFundo.classList.add("desativando");
    menuLayout.classList.add("desativando");
    setTimeout(fimDaAnimacaoFechar, 250);
}

function fimDaAnimacaoFechar () {
    menuFundo.classList.add("desativado");
    menuLayout.classList.add("desativado");
}
// Funções de abrir e fechar o menu
