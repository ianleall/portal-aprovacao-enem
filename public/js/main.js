// ===== main.js — liga tudo quando a página abre =====

// Troca de aba. Também é chamada pelos botões da página inicial (onclick no HTML).
function irPara(aba) {
  document.querySelectorAll("#nav button").forEach((b) => b.classList.toggle("on", b.dataset.t === aba));
  document.querySelectorAll("section").forEach((s) => s.classList.toggle("on", s.id === aba));
  if (aba === "hist") desenharHistorico(); // o histórico é redesenhado toda vez que abre
  window.scrollTo(0, 0);
}

// Clique nas abas do menu
document.querySelectorAll("#nav button").forEach((botao) => {
  botao.onclick = () => irPara(botao.dataset.t);
});

// Ordem de inicialização
carregarLocal();      // util.js    — lê o histórico guardado no navegador
iniciarConta();       // conta.js   — botão Entrar e janela de login
atualizarTopo();      // conta.js   — mostra o nome (se estiver logado)
desenharTemas();      // estudar.js — cards da aba Estudar
iniciarRedacao();     // redacao.js — as 3 sub-abas
mostrarMenu();        // simulado.js
iniciarCronometro();  // timer.js
