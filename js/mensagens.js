
let intervaloCarregarMensagens;

const chat = document.querySelector(".chat");
const inputMensagem = document.querySelector(".input-mensagem");

function inicializarChat () {
    carregarMensagens();
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
                chat.innerHTML += `
                    <div class="mensagem privada">
                        <span class="tempo">(${mensagem.time})</span>
                        <em>${mensagem.from}</em> reservadamente para <em>${mensagem.to}</em>: ${mensagem.text}
                    </div>
                `;
                break;
        }
    });
    const mensagens = chat.querySelectorAll(".mensagem");
    const ultimaMensagem = mensagens.item(mensagens.length - 1);
    ultimaMensagem.scrollIntoView();
}
// Carregamento e impressão de imagens no navegador



// Enviando mensagens
function enviarMensagem () {
    const envio = {
        from: usuarioNome,
        to: "Todos",
        text: inputMensagem.value,
        type: "message"
    };
    inputMensagem.value = "";
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", envio);
    promessa.then(sucessoEnvio);
}

function sucessoEnvio () {
    carregarMensagens();
}
// Enviando mensagens
