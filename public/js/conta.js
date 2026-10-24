// ===== conta.js — login, cadastro e conversa com o servidor (server.js) =====

// Dados da pessoa logada. Ficam guardados no navegador para continuar logado.
let token = localStorage.getItem("tk");          // "crachá" que o servidor entrega no login
let emailUsuario = localStorage.getItem("em");
let nomeUsuario = localStorage.getItem("nm");
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // algo@dominio.com
const SENHA_MINIMA = 8;                                    // mínimo de caracteres da senha
let modo = "login";                              // "login" ou "register" (aba escolhida)

// Faz uma chamada ao servidor. Exemplo: api("/log") ou api("/login", "POST", {...})
async function api(rota, metodo = "GET", corpo) {
  const resposta = await fetch("/api" + rota, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? "Bearer " + token : "",
    },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  const json = await resposta.json();
  if (!resposta.ok) throw new Error(json.erro || "Erro"); // erros do servidor viram avisos
  return json;
}

// Atualiza o botão do topo e o texto da aba Início conforme a pessoa está logada ou não
function atualizarTopo() {
  const nome = nomeUsuario || (emailUsuario || "").split("@")[0];
  $("login").textContent = token ? "👤 " + nome : "Entrar";
  $("who").textContent = token
    ? "Conectado como " + nome + ": seu histórico fica salvo no banco de dados."
    : "Modo local: entre para salvar seu histórico na sua conta.";
}

// Busca no servidor o histórico da conta
async function baixarHistorico() {
  if (!token) return;
  try {
    const r = await api("/log");
    estado.log = r.log;
    salvarLocal();
  } catch (e) {}
}

// Envia uma atividade nova ao servidor (só se estiver logado)
function enviarAtividade(atividade) {
  if (token) api("/log", "POST", atividade).catch(() => {});
}

// ----- avisos da janela de login -----
function mostrarAviso(texto, tipo) { // tipo: "err" (vermelho) ou "ok" (verde)
  const aviso = $("aviso");
  aviso.className = "aviso " + tipo;
  aviso.textContent = texto;
  void aviso.offsetWidth;            // truque para a animação reiniciar
  aviso.classList.add("show");
}
function limparAviso() { $("aviso").className = "aviso"; }

// Troca entre as abas "Entrar" e "Criar conta"
function trocarModo(novoModo) {
  modo = novoModo;
  limparAviso();
  $("tabs").dataset.m = modo;                                // o CSS usa isso para deslizar o marcador
  $("tl").classList.toggle("on", modo === "login");
  $("tr").classList.toggle("on", modo === "register");
  $("fnome").classList.toggle("open", modo === "register");  // campo Nome só no cadastro
  $("asub").textContent = modo === "login" ? "Entrar" : "Criar conta";
}

// Mostra o formulário (deslogado) ou a tela "Olá, Nome" (logado)
function mostrarVista() {
  $("fform").style.display = token ? "none" : "block";
  $("fconta").style.display = token ? "block" : "none";
  if (token) {
    $("cnome").textContent = nomeUsuario || emailUsuario;
    $("cmail").textContent = emailUsuario;
  }
}

// Acontece ao clicar no botão grande (Entrar / Criar conta)
async function enviarFormulario() {
  limparAviso();
  const email = $("ae").value.trim();
  const senha = $("as").value;
  const nome = $("an").value.trim();

  if (modo === "register" && !nome) return mostrarAviso("Digite seu nome.", "err");
  if (!email || !senha) return mostrarAviso("Preencha e-mail e senha.", "err");
  if (!EMAIL_VALIDO.test(email)) return mostrarAviso("Digite um e-mail válido, como nome@email.com", "err");
  // a regra do tamanho só vale para criar conta (quem já tem conta pode ter senha antiga)
  if (modo === "register" && senha.length < SENHA_MINIMA) return mostrarAviso("A senha precisa ter no mínimo " + SENHA_MINIMA + " caracteres.", "err");

  $("asub").disabled = true;
  try {
    const r = await api("/" + modo, "POST", { email, senha, nome });
    token = r.token; emailUsuario = r.email; nomeUsuario = r.nome || "";
    localStorage.setItem("tk", token);
    localStorage.setItem("em", emailUsuario);
    localStorage.setItem("nm", nomeUsuario);

    // Conta nova: manda para o banco o que a pessoa já tinha feito sem login
    if (modo === "register") {
      for (const atividade of estado.log) await api("/log", "POST", atividade);
    }
    await baixarHistorico();
    atualizarTopo();
    mostrarAviso(
      modo === "register" ? "Conta criada! Bem-vindo, " + nomeUsuario + "." : "Bem-vindo de volta, " + (nomeUsuario || emailUsuario) + "!",
      "ok"
    );
    setTimeout(() => { $("adlg").close(); $("ae").value = ""; $("as").value = ""; $("an").value = ""; }, 1100);
  } catch (e) {
    const semServidor = e.name === "TypeError" || e instanceof SyntaxError;
    mostrarAviso(semServidor ? "Servidor não encontrado. Abra o site em http://localhost:4000" : e.message, "err");
    const caixa = $("abox");           // balança a caixa de login
    caixa.classList.remove("shake");
    void caixa.offsetWidth;
    caixa.classList.add("shake");
  }
  $("asub").disabled = false;
}

// Sair da conta: apaga os dados do navegador
function sair() {
  token = emailUsuario = nomeUsuario = null;
  ["tk", "em", "nm"].forEach((k) => localStorage.removeItem(k));
  estado.log = [];
  salvarLocal();
  atualizarTopo();
  $("adlg").close();
}

// Liga os botões da janela de login (chamada por main.js)
function iniciarConta() {
  $("login").onclick = () => { trocarModo("login"); mostrarVista(); $("adlg").showModal(); };
  $("afech").onclick = () => $("adlg").close();
  $("tl").onclick = () => trocarModo("login");
  $("tr").onclick = () => trocarModo("register");
  $("eye").onclick = () => { $("as").type = $("as").type === "password" ? "text" : "password"; };
  $("asub").onclick = enviarFormulario;
  $("asair").onclick = sair;
  ["an", "ae", "as"].forEach((id) => { $(id).onkeydown = (e) => { if (e.key === "Enter") enviarFormulario(); }; });
  baixarHistorico().then(atualizarTopo);
}
