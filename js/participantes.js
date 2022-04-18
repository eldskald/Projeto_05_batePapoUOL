
let mandandoPara = "Todos";
let visibilidade = "message";

const menuFundo = document.querySelector(".participantes");
const menuLayout = document.querySelector(".participantes-menu");
const menuLista = document.querySelector(".participantes-lista");
const menuVisibilidade = document.querySelector(".visibilidade-lista");
const menuVisibilidadeTitulo = document.querySelector(".visibilidade-titulo");



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
    renderizarVisibilidade();
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
            <p onclick="escolherTodos()">Todos</p>
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
        if (nome === mandandoPara) {
            let check = nodos[i].querySelector(".checkmark");
            check.classList.remove("desativado");
        }
    }
}

function escolherTodos () {
    mandandoPara = "Todos";
    visibilidade = "Pública";
    renderizarLista();
    renderizarVisibilidade();
    atualizarIndicador();
}

function escolherParticipante (nodo) {
    mandandoPara = nodo.innerHTML;
    renderizarLista();
    renderizarVisibilidade();
    atualizarIndicador();
}
// Funções de gerenciar a lista de participantes



// Funções de escolher se a mensagem será pública ou privada
function renderizarVisibilidade () {
    if (mandandoPara !== "Todos") {
        menuVisibilidade.classList.remove("desativado");
        menuVisibilidadeTitulo.classList.remove("desativado");
    }
    else {
        menuVisibilidade.classList.add("desativado");
        menuVisibilidadeTitulo.classList.add("desativado");
    }

    const opcaoPublica = menuVisibilidade.querySelector(".publica");
    const opcaoReservada = menuVisibilidade.querySelector(".reservada");
    switch (visibilidade) {
        case "message":
            opcaoPublica.querySelector(".checkmark").classList.remove("desativado");
            opcaoReservada.querySelector(".checkmark").classList.add("desativado");
            break;
        case "private_message":
            opcaoPublica.querySelector(".checkmark").classList.add("desativado");
            opcaoReservada.querySelector(".checkmark").classList.remove("desativado");
            break;
    }
}

function mudarVisibilidade (novoValor) {
    visibilidade = novoValor;
    renderizarVisibilidade();
    atualizarIndicador();
}

function atualizarIndicador () {
    const indicador = document.querySelector(".indicador-visibilidade");
    switch (visibilidade) {
        case "message":
            indicador.innerHTML = `
                Enviando para <em>${mandandoPara}</em>:
            `;
            break;
        case "private_message":
            indicador.innerHTML = `
                Enviando reservadamente para <em>${mandandoPara}</em>:
            `;
    }
}
// Funções de escolher se a mensagem será pública ou privada
