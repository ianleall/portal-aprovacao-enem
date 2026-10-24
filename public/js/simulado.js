// ===== simulado.js — menu, perguntas, correção e revisão dos erros =====

// Quantas questões cada nível pede. Se o banco (QUESTOES) tiver menos, usa todas.
const TAMANHOS = { rapido: 25, medio: 45, enem: 90 };

// Dados da rodada atual
let sim = { questoes: [], indice: 0, acertos: 0, respondidas: 0, erros: [], nivel: "" };

// ----- Menu inicial: escolher o nível -----
function mostrarMenu() {
  const qtd = (nivel) => Math.min(TAMANHOS[nivel], QUESTOES.length);
  const aviso = QUESTOES.length < TAMANHOS.enem
    ? `<p class="mut">Banco atual: ${QUESTOES.length} questões. Os simulados maiores que isso usam todas as questões disponíveis até o banco chegar a 90.</p>`
    : "";

  $("simbox").innerHTML = `
    <h2>Escolha o simulado</h2>
    <p class="mut">Questões no estilo ENEM, com explicação quando você errar. Dá para encerrar a qualquer momento.</p>
    <button class="btn o" data-n="rapido">⚡ Rápido (${qtd("rapido")})</button>
    <button class="btn" data-n="medio">Médio (${qtd("medio")})</button>
    <button class="btn" data-n="enem">Nível ENEM (${qtd("enem")}${QUESTOES.length < TAMANHOS.enem ? " de 90" : ""})</button>
    ${aviso}
    <p class="mut">Quer treinar com questões oficiais?
      <a target="_blank" rel="noopener" href="https://www.google.com/search?q=provas+e+gabaritos+enem+inep">Provas e gabaritos do INEP</a></p>`;

  document.querySelectorAll("#simbox [data-n]").forEach((botao) => {
    botao.onclick = () => iniciarSimulado(botao.dataset.n);
  });
}

// ----- Começa uma rodada: sorteia as questões -----
function iniciarSimulado(nivel) {
  sim = {
    questoes: embaralhar(QUESTOES.slice()).slice(0, TAMANHOS[nivel]), // cópia embaralhada
    indice: 0, acertos: 0, respondidas: 0, erros: [], nivel,
  };
  mostrarQuestao();
}

// ----- Mostra a questão atual -----
function mostrarQuestao() {
  if (sim.indice >= sim.questoes.length) return finalizarSimulado();

  const [area, enunciado, alternativas, certa, explicacao] = sim.questoes[sim.indice];
  const caixa = $("simbox");
  caixa.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <span class="mut">Questão ${sim.indice + 1} de ${sim.questoes.length} · <span class="tag">${area}</span></span>
      <button class="btn alt" id="enc">⏹ Encerrar</button>
    </div>
    <h3 style="margin-top:12px"></h3>`;
  caixa.querySelector("h3").textContent = enunciado;
  $("enc").onclick = finalizarSimulado;

  let respondida = false;
  alternativas.forEach((texto, i) => {
    const botao = document.createElement("button");
    botao.className = "opt";
    botao.textContent = texto;
    botao.onclick = () => {
      if (respondida) return;          // só vale a primeira escolha
      respondida = true;
      sim.respondidas++;

      if (i === certa) {
        botao.classList.add("ok");
        sim.acertos++;
      } else {
        botao.classList.add("bad");
        caixa.querySelectorAll(".opt")[certa].classList.add("ok");
        sim.erros.push([area, enunciado, texto, alternativas[certa], explicacao]);
        const porque = document.createElement("div");
        porque.className = "why";
        porque.textContent = "Por quê? " + explicacao;
        caixa.appendChild(porque);
      }

      const proxima = document.createElement("button");
      proxima.className = "btn";
      proxima.textContent = sim.indice + 1 >= sim.questoes.length ? "Ver resultado" : "Próxima";
      proxima.onclick = () => { sim.indice++; mostrarQuestao(); };
      caixa.appendChild(proxima);
    };
    caixa.appendChild(botao);
  });
}

// ----- Resultado final + revisão dos erros -----
function finalizarSimulado() {
  const caixa = $("simbox");
  if (sim.respondidas > 0) {
    registrarAtividade({ tipo: "sim", nivel: sim.nivel, acertos: sim.acertos, respondidas: sim.respondidas, total: sim.questoes.length });
  }

  const encerrouCedo = sim.respondidas < sim.questoes.length;
  caixa.innerHTML = `
    <h2>Resultado</h2>
    <div class="big">${sim.acertos}/${sim.respondidas}</div>
    <p class="mut">${encerrouCedo ? "Simulado encerrado antes do fim. " : ""}${sim.respondidas ? "Salvo no histórico." : "Nenhuma questão respondida."}</p>`;

  if (sim.erros.length) {
    caixa.insertAdjacentHTML("beforeend", "<h3>Entenda seus erros</h3>");
    for (const [area, enunciado, marcou, correta, explicacao] of sim.erros) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<span class="tag">${area}</span><p><b></b></p><p class="mut"></p><div class="why"></div>`;
      card.querySelector("b").textContent = enunciado;
      card.querySelector(".mut").textContent = `Você marcou: ${marcou} | Correta: ${correta}`;
      card.querySelector(".why").textContent = explicacao;
      caixa.appendChild(card);
    }
  }

  const novo = document.createElement("button");
  novo.className = "btn o";
  novo.textContent = "Novo simulado";
  novo.onclick = mostrarMenu;
  caixa.appendChild(novo);
}
