
let pontos = 0;
let numeroPergunta = 0;
let respostaCerta = 0;
let terminou = false;

function gerarPergunta() {
    if (numeroPergunta === 10) {
        finalizarJogo();
        return;
    }

    numeroPergunta++;

    let n1 = Math.floor(Math.random() * 10) + 1;
    let n2 = Math.floor(Math.random() * 10) + 1;
    let operacao = Math.random() < 0.5 ? "+" : "-";

    if (operacao === "-" && n1 < n2) {
        let troca = n1;
        n1 = n2;
        n2 = troca;
    }

    respostaCerta = operacao === "+"
        ? n1 + n2
        : n1 - n2;

    document.getElementById("progresso").textContent =
        "Pergunta " + numeroPergunta + " de 10";

    document.getElementById("pergunta").textContent =
        "Quanto é " + n1 + " " + operacao + " " + n2 + "?";

    document.getElementById("mensagem").textContent = "";

    let alternativas = [respostaCerta];

    while (alternativas.length < 3) {
        let valor = respostaCerta + Math.floor(Math.random() * 11) - 5;

        if (valor >= 0 && !alternativas.includes(valor)) {
            alternativas.push(valor);
        }
    }

    alternativas.sort(() => Math.random() - 0.5);

    let area = document.getElementById("alternativas");
    area.innerHTML = "";

    alternativas.forEach(function(valor) {
        let botao = document.createElement("button");
        botao.textContent = valor;

        botao.onclick = function() {
            responder(valor);
        };

        area.appendChild(botao);
    });
}

function responder(resposta) {
    if (terminou) return;

    let botoes = document.querySelectorAll("#alternativas button");
    botoes.forEach(function(botao) {
        botao.disabled = true;
    });

    if (resposta === respostaCerta) {
        pontos += 10;
        document.getElementById("mensagem").textContent =
            "Resposta correta! +10 pontos";
    } else {
        pontos -= 5;
        document.getElementById("mensagem").textContent =
            "Resposta errada! -5 pontos. Resposta: " + respostaCerta;
    }

    document.getElementById("pontos").textContent = pontos;

    setTimeout(gerarPergunta, 1200);
}

function finalizarJogo() {
    terminou = true;

    document.getElementById("progresso").textContent =
        "Jogo finalizado!";

    document.getElementById("pergunta").textContent =
        "Sua pontuação final foi: " + pontos + " pontos!";

    document.getElementById("alternativas").innerHTML = "";

    document.getElementById("mensagem").textContent =
        pontos >= 50
            ? "Parabéns! Você mandou muito bem!"
            : "Continue praticando para melhorar!";

    document.getElementById("reiniciar").style.display = "inline-block";
}

function reiniciarJogo() {
    pontos = 0;
    numeroPergunta = 0;
    terminou = false;

    document.getElementById("pontos").textContent = pontos;
    document.getElementById("reiniciar").style.display = "none";

    gerarPergunta();
}

gerarPergunta();
