// Lista de números:
let listaDeNumerosSorteados = [];
let numeroLimite = 100;

// Armazenado elementos do HTML:
const userInput = document.querySelector("#input-user");
const btnChutar = document.querySelector("#btn-chutar");
const btnReiniciar = document.querySelector("#reiniciar");

// Criar função para mudar seletores e reduzir o tamanho do código.
function mudarTexto(id, texto) {
  let campo = document.querySelector(`#${id}`);
  campo.textContent = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}
function exibirMensagemInicial() {
  mudarTexto("titulo", "Jogo do número secreto!");
  mudarTexto("mensagem", "Escolha um número entre 1 a 10");
}
exibirMensagemInicial();

// Mostrar o número de tentattivas até a resposta certa.
let tentativas = 1;
let numeroSecreto = randomNumber();
function verificarChute() {
  let chute = userInput.value;

  if (chute == numeroSecreto) {
    mudarTexto("titulo", "Você acertou!");
    let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavraTentativas}.`;
    mudarTexto("mensagem", mensagemTentativas);
    limparCampo();
    btnReiniciar.removeAttribute("disabled");
    userInput.setAttribute("disabled", true);
  } else {
    if (chute > 10 || chute == "") {
      mudarTexto(
        "mensagem",
        "Escreva um número de o 0 a 10. Clique em Novo jogo."
      );
      btnReiniciar.removeAttribute("disabled");
      userInput.setAttribute("disabled", true);
    } else if (chute > numeroSecreto) {
      mudarTexto("mensagem", `O número secreto é menor que ${chute}.`);
    } else {
      mudarTexto("mensagem", `O número secreto é maior que ${chute}`);
    }
  }
  tentativas++;
  limparCampo();
}

// Função para gerar número aleatório:
function randomNumber() {
  let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return randomNumber();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}
// Função limpar input:
function limparCampo() {
  userInput.value = "";
  userInput.focus();
}

// Reiniciar jogo:
function reiniciarJogo() {
  numeroSecreto = randomNumber();
  limparCampo();
  tentativas = 1;
  btnReiniciar.setAttribute("disabled", true);
  userInput.removeAttribute("disabled");
  exibirMensagemInicial();
}
