
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
    renderizarLista();
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



// Funções de gerenciar a lista de participantes
function renderizarLista () {
    const requisicao = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    requisicao.then(sucessoRenderizar);
}

function sucessoRenderizar (resposta) {
    menuLista.innerHTML = `
        <div class="participante">
            <ion-icon name="people-outline"></ion-icon>
            <p onclick="escolherParticipante(this)">Todos</p>
            <ion-icon name="checkmark-outline" class="checkmark desativado"></ion-icon>
        </div>
    `;
    resposta.data.map(function (participante) {
        if (participante.name !== usuarioNome) {
            menuLista.innerHTML += `
                <div class="participante">
                    <ion-icon name="person-outline"></ion-icon>
                    <p onclick="escolherParticipante(this)">${participante.name}</p>
                    <ion-icon name="checkmark-outline" class="checkmark desativado"></ion-icon>
                </div>
            `;
        }
    });
    const nodos = menuLista.querySelectorAll(".participante");
    for (let i = 0; i < nodos.length; i++) {
        let nome = nodos[i].querySelector("p").innerHTML;
        console.log(nome);
        if (nome === mandandoPara) {
            let check = nodos[i].querySelector(".checkmark");
            check.classList.remove("desativado");
        }
    }
}

function escolherParticipante (nodo) {
    mandandoPara = nodo.innerHTML;
    renderizarLista();
}
// Funções de gerenciar a lista de participantes

