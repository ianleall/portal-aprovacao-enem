// ===== timer.js — cronômetro de foco (botão no topo à direita) =====

let relogio = null;        // guarda o "setInterval" enquanto o cronômetro roda
let segundosRestantes = 0;
let segundosTotais = 0;
let minutosEscolhidos = 25;

// Mostra 05:00 no botão do topo
function mostrarTempo() {
  const m = Math.floor(segundosRestantes / 60);
  const s = segundosRestantes % 60;
  $("pill").textContent = "⏱ " + doisDigitos(m) + ":" + doisDigitos(s);
}

// Para o cronômetro e registra no histórico o tempo que foi estudado
function pararTimer(terminouSozinho) {
  clearInterval(relogio);
  relogio = null;

  const segundosEstudados = segundosTotais - segundosRestantes;
  const minutos = Math.max(1, Math.round(segundosEstudados / 60));
  if (segundosEstudados >= 30) registrarAtividade({ tipo: "foco", minutos }); // menos de 30 s não conta

  $("pill").textContent = "⏱ Foco";
  if (terminouSozinho) alert("Tempo concluído! " + minutos + " min registrados.");
}

function iniciarTimer() {
  const minutos = Number($("cm").value) || minutosEscolhidos;
  if (relogio) pararTimer(false);

  segundosTotais = segundosRestantes = minutos * 60;
  mostrarTempo();
  relogio = setInterval(() => {
    segundosRestantes--;
    if (segundosRestantes <= 0) { segundosRestantes = 0; mostrarTempo(); pararTimer(true); }
    else mostrarTempo();
  }, 1000);
  $("dlg").close();
}

// Liga os botões da janelinha do cronômetro (chamada por main.js)
function iniciarCronometro() {
  $("pill").onclick = () => $("dlg").showModal();
  $("close").onclick = () => $("dlg").close();
  document.querySelectorAll("[data-m]").forEach((botao) => {
    botao.onclick = () => { minutosEscolhidos = Number(botao.dataset.m); $("cm").value = ""; };
  });
  $("go").onclick = iniciarTimer;
  $("stop").onclick = () => { if (relogio) pararTimer(false); $("dlg").close(); };
}
