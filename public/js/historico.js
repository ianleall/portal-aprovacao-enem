// ===== historico.js — aba Histórico: uma linha para cada atividade =====

const NOMES_NIVEL = { rapido: "Rápido", medio: "Médio", enem: "Nível ENEM" };

// 90 -> "1h 30min"   |   25 -> "25 min"
function formatarMinutos(min) {
  if (min < 60) return min + " min";
  const resto = min % 60;
  return Math.floor(min / 60) + "h" + (resto ? " " + resto + "min" : "");
}

const doisDigitos = (n) => String(n).padStart(2, "0");

// Texto que descreve uma atividade
function descreverAtividade(a) {
  if (a.tipo === "foco") return "⏱ Foco por " + formatarMinutos(a.minutos);
  if (a.tipo === "red") return "✍️ Redação · nota " + a.nota + "/1000";
  const incompleto = a.total && a.respondidas < a.total ? ` (encerrado, de ${a.total})` : "";
  return `📝 Simulado ${NOMES_NIVEL[a.nivel] || a.nivel} · ${a.acertos} acertos em ${a.respondidas} questões${incompleto}`;
}

function desenharHistorico() {
  const atividades = estado.log.slice().reverse(); // mais recentes primeiro
  if (!atividades.length) {
    $("hbox").innerHTML = '<p class="mut">Nada por aqui ainda. Use o cronômetro, faça um simulado ou corrija uma redação.</p>';
    return;
  }

  let linhas = "";
  for (const a of atividades) {
    const d = new Date(a.ts);
    const dia = doisDigitos(d.getDate()) + "/" + doisDigitos(d.getMonth() + 1);
    const hora = doisDigitos(d.getHours()) + ":" + doisDigitos(d.getMinutes());
    linhas += `<tr><td>${dia}</td><td>${hora}</td><td>${descreverAtividade(a)}</td></tr>`;
  }
  $("hbox").innerHTML = `<table><tr><th>Dia</th><th>Horário</th><th>Atividade</th></tr>${linhas}</table>`;
}
