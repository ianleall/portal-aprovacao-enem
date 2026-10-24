// ===== util.js — ferramentas usadas por todos os outros arquivos =====

// Atalho: $("abc") é o mesmo que document.getElementById("abc")
const $ = (id) => document.getElementById(id);

// "estado" guarda o que o site precisa lembrar: a lista de atividades do aluno.
// Cada atividade é um objeto, por exemplo:
//   { tipo: "foco", minutos: 25, ts: 1730000000000 }
//   { tipo: "sim", nivel: "rapido", acertos: 20, respondidas: 25, total: 25, ts: ... }
//   { tipo: "red", nota: 640, ts: ... }
// "ts" é o momento em que aconteceu (data e hora).
const estado = { log: [] };

// Guarda o estado no navegador (funciona mesmo sem login)
function salvarLocal() {
  try { localStorage.setItem("enem2", JSON.stringify(estado)); } catch (e) {}
}

// Lê o estado guardado quando o site abre
function carregarLocal() {
  try {
    const salvo = JSON.parse(localStorage.getItem("enem2") || "null");
    if (salvo && salvo.log) estado.log = salvo.log;
  } catch (e) {}
}

// Registra uma atividade nova: guarda no navegador e, se tiver login, envia ao banco
function registrarAtividade(atividade) {
  atividade.ts = Date.now();
  estado.log.push(atividade);
  salvarLocal();
  enviarAtividade(atividade); // definida em conta.js
}

// Embaralha uma lista de verdade (algoritmo Fisher-Yates)
function embaralhar(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
  return lista;
}

// Transforma texto em algo seguro para colocar dentro de um link
const paraLink = (texto) => encodeURIComponent(texto);
