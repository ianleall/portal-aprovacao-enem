// Servidor do Portal de Aprovação ENEM: login + banco de dados local (SQLite)
const express = require("express");
const { DatabaseSync } = require("node:sqlite"); // banco que já vem no Node
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const SEGREDO = process.env.SEGREDO || "troque-este-segredo-antes-de-publicar";
const db = new DatabaseSync("enem.db"); // arquivo criado automaticamente
db.exec(`
CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY, email TEXT UNIQUE, hash TEXT);
CREATE TABLE IF NOT EXISTS atividades(id INTEGER PRIMARY KEY, usuario_id INTEGER, dados TEXT);
`);
try { db.exec("ALTER TABLE usuarios ADD COLUMN nome TEXT"); } catch (e) {} // contas antigas ganham a coluna nome

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// E-mail válido: algo@dominio.com (sem espaços, com @ e um ponto depois)
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const gerarToken = (id) => jwt.sign({ id }, SEGREDO, { expiresIn: "30d" });
function exigirLogin(req, res, next) {
  try { req.uid = jwt.verify((req.headers.authorization || "").slice(7), SEGREDO).id; next(); }
  catch (e) { res.status(401).json({ erro: "Faça login para continuar" }); }
}

app.post("/api/register", (req, res) => {
  const { email, senha } = req.body || {};
  const nome = ((req.body || {}).nome || "").trim().slice(0, 30);
  if (!nome) return res.status(400).json({ erro: "Digite seu nome" });
  if (!email || !EMAIL_VALIDO.test(email.trim())) return res.status(400).json({ erro: "Digite um e-mail válido, como nome@email.com" });
  if (!senha || senha.length < 8) return res.status(400).json({ erro: "A senha precisa ter no mínimo 8 caracteres" });
  try {
    const r = db.prepare("INSERT INTO usuarios(email,hash,nome) VALUES(?,?,?)").run(email.trim().toLowerCase(), bcrypt.hashSync(senha, 10), nome);
    res.json({ token: gerarToken(Number(r.lastInsertRowid)), email: email.trim().toLowerCase(), nome });
  } catch (e) { res.status(400).json({ erro: "Este e-mail já está cadastrado" }); }
});

app.post("/api/login", (req, res) => {
  const { email, senha } = req.body || {};
  const u = db.prepare("SELECT * FROM usuarios WHERE email=?").get((email || "").toLowerCase());
  if (!u) return res.status(400).json({ erro: "E-mail não cadastrado" });
  if (!bcrypt.compareSync(senha || "", u.hash)) return res.status(400).json({ erro: "Senha incorreta" });
  res.json({ token: gerarToken(u.id), email: u.email, nome: u.nome || "" });
});

app.get("/api/log", exigirLogin, (req, res) => {
  const linhas = db.prepare("SELECT dados FROM atividades WHERE usuario_id=? ORDER BY id").all(req.uid);
  res.json({ log: linhas.map((l) => JSON.parse(l.dados)) });
});

app.post("/api/log", exigirLogin, (req, res) => {
  db.prepare("INSERT INTO atividades(usuario_id,dados) VALUES(?,?)").run(req.uid, JSON.stringify(req.body));
  res.json({ ok: true });
});

app.listen(4000, () => console.log("Site rodando em http://localhost:4000"));
