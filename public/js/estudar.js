// ===== estudar.js — desenha os cards da aba Estudar =====
// Os temas vêm de AREAS (em dados.js). Aqui só montamos o HTML de cada card.

function linkBotao(texto, url, classe) {
  return `<a class="btn ${classe}" target="_blank" rel="noopener" href="${url}">${texto}</a>`;
}

function desenharTemas() {
  let html = "";
  for (const [area, emoji, temas] of AREAS) {
    html += `<h2 class="area">${emoji} ${area}</h2><div class="grid">`;
    for (const [titulo, dica, busca] of temas) {
      html += `
        <div class="card">
          <h3>${titulo}</h3>
          <p class="mut">${dica}</p>
          <p>
            ${linkBotao("▶ Aulas", "https://www.youtube.com/results?search_query=" + paraLink("aula " + busca), "")}
            ${linkBotao("📄 Apostilas", "https://www.google.com/search?q=" + paraLink("apostila pdf " + busca), "alt")}
            ${linkBotao("✅ Questões", "https://www.google.com/search?q=" + paraLink("questões " + busca + " com gabarito"), "alt")}
          </p>
        </div>`;
    }
    html += "</div>";
  }
  $("temas").innerHTML = html;
}
