
let intervaloCarregarMensagens;

const chat = document.querySelector(".chat");
const inputMensagem = document.querySelector(".input-mensagem");

function inicializarChat () {
    carregarMensagens();
    inputMensagem.focus();
    intervaloCarregarMensagens = setInterval(carregarMensagens, 3000);
}



// Carregamento e impressão de imagens no navegador
function carregarMensagens () {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(sucessoCarregar);
}

function sucessoCarregar (resposta) {
    chat.innerHTML = `
        <div class="espacador"></div>
    `;
    resposta.data.map(function (mensagem) {
        switch (mensagem.type) {
            case "status":
                chat.innerHTML += `
                    <div class="mensagem status">
                        <span class="tempo">(${mensagem.time})</span>
                        <em>${mensagem.from}</em> ${mensagem.text}
                    </div>
                `;
                break;
            case "message":
                chat.innerHTML += `
                    <div class="mensagem">
                        <span class="tempo">(${mensagem.time})</span>
                        <em>${mensagem.from}</em> para <em>${mensagem.to}</em>: ${mensagem.text}
                    </div>
                `;
                break;
            case "private-message":
                if (mensagem.to === usuarioNome) {
                    chat.innerHTML += `
                        <div class="mensagem privada">
                            <span class="tempo">(${mensagem.time})</span>
                            <em>${mensagem.from}</em> reservadamente para <em>${mensagem.to}</em>: ${mensagem.text}
                        </div>
                    `;
                }
                break;
        }
    });
    const mensagens = chat.querySelectorAll(".mensagem");
    const ultimaMensagem = mensagens.item(mensagens.length - 1);
    ultimaMensagem.scrollIntoView();
}
// Carregamento e impressão de imagens no navegador



// Enviando mensagens
inputMensagem.onkeypress = (event) => {
    const tecla = event.keyCode;
    if (tecla === 13) {
        enviarMensagem();
    }
}

function enviarMensagem () {
    const envio = {
        from: usuarioNome,
        to: mandandoPara,
        text: inputMensagem.value,
        type: "message"
    };
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", envio);
    promessa.then(sucessoEnviar);
    promessa.catch(falhaEnviar);
}

function sucessoEnviar () {
    inputMensagem.value = "";
    carregarMensagens();
}

function falhaEnviar () {
    mensagemDeErro.innerHTML = "Conexão perdida!";
    telaDeEntrada.classList.remove("desativado");
    clearInterval(intervaloManterConexao);
}
// Enviando mensagens
