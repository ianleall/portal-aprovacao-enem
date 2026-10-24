// ===== redacao.js — aba Redação: Cartilha, Estrutura em cores e Escrever/Corrigir =====

// ----- Sub-abas (Cartilha | Estrutura | Escrever e corrigir) -----
function iniciarSubAbas() {
  document.querySelectorAll("#rsub button").forEach((botao) => {
    botao.onclick = () => {
      document.querySelectorAll("#rsub button").forEach((b) => b.classList.toggle("on", b === botao));
      document.querySelectorAll(".rp").forEach((painel) => {
        painel.style.display = painel.id === botao.dataset.r ? "block" : "none";
      });
    };
  });
}

// ----- 1. Cartilha: as 5 competências -----
function desenharCompetencias() {
  $("comps").innerHTML = COMPETENCIAS
    .map(([titulo, explicacao]) => `<details><summary>${titulo}</summary><p class="mut">${explicacao}</p></details>`)
    .join("");
}

// ----- 2. Estrutura em cores -----
// Mostra a redação simulada (frases coloridas) + os moldes com [lacunas]
function desenharBloco(nomeBloco) {
  const trechos = ESTRUTURA[nomeBloco];
  let texto = "";    // redação simulada (só os trechos que não são alternativas)
  let legenda = "";  // etiquetas coloridas
  let moldes = "";   // lista de moldes e exemplos

  for (const [cor, rotulo, molde, exemplo, alternativa] of trechos) {
    if (!alternativa) {
      texto += `<span style="--c:${cor}">${exemplo}</span> `;
      legenda += `<span class="chip" style="--c:${cor}">${rotulo}</span>`;
    }
    moldes += `
      <div class="seg" style="--c:${cor}">
        <span class="chip">${rotulo}</span>
        <p class="m">Molde: ${molde}</p>
        <p style="margin:4px 0">${exemplo}</p>
      </div>`;
  }

  $("bloco").innerHTML = `
    <div class="card">
      <h2>${nomeBloco} · redação simulada</h2>
      <p class="mut">Tema de exemplo: desafios para combater a desinformação no Brasil.</p>
      <p class="ess">${texto}</p>
      <div class="chips">${legenda}</div>
    </div>
    <div class="card">
      <h2>Moldes e variações</h2>
      <p class="mut">Preencha o que está entre colchetes com o seu tema.</p>
      ${moldes}
    </div>`;
}

function iniciarEstrutura() {
  const nomes = Object.keys(ESTRUTURA);
  $("blocos").innerHTML = nomes
    .map((nome, i) => `<button data-k="${nome}" ${i === 0 ? 'class="on"' : ""}>${nome}</button>`)
    .join("");
  document.querySelectorAll("#blocos button").forEach((botao) => {
    botao.onclick = () => {
      document.querySelectorAll("#blocos button").forEach((b) => b.classList.toggle("on", b === botao));
      desenharBloco(botao.dataset.k);
    };
  });
  desenharBloco(nomes[0]);
}

// ----- 3. Escrever e corrigir -----
function iniciarEscrita() {
  // contador de palavras
  $("txt").oninput = () => {
    const palavras = $("txt").value.trim().split(/\s+/).filter(Boolean).length;
    $("cnt").textContent = palavras + " palavras";
  };

  // Botão de correção com IA.
  // FUTURO: aqui o site vai enviar o texto ao servidor, que chama uma IA
  // (com uma chave de API guardada no server.js) e devolve as 5 notas.
  $("corr").onclick = () => {
    $("res").innerHTML = `
      <div class="warn">A correção com IA ainda não está ligada nesta versão do site.
      Ela precisa de uma chave de API no servidor (próxima etapa).</div>`;
  };
}

function iniciarRedacao() {
  iniciarSubAbas();
  desenharCompetencias();
  iniciarEstrutura();
  iniciarEscrita();
}
