# Portal de Aprovação ENEM — mapa do projeto

Como rodar: `npm.cmd install` (só na primeira vez) e depois `node --watch server.js`.
Abra http://localhost:4000

## Arquivos
server.js            -> servidor + banco de dados (login e histórico)
package.json         -> lista de pacotes que o servidor usa
public/index.html    -> estrutura da página (os "blocos": abas, janelas)
public/css/style.css -> aparência (cores no começo do arquivo)
public/js/dados.js     -> TODO o conteúdo: temas, questões, estrutura da redação
public/js/util.js      -> ferramentas comuns e o "estado" do site
public/js/conta.js     -> login, cadastro, conversa com o servidor
public/js/estudar.js   -> cards da aba Estudar
public/js/redacao.js   -> aba Redação
public/js/simulado.js  -> simulados
public/js/historico.js -> aba Histórico
public/js/timer.js     -> cronômetro
public/js/main.js      -> liga tudo (começa por aqui para entender)

## Onde mexer para...
Mudar cores              -> css/style.css (seção 1)
Adicionar questão        -> js/dados.js (lista QUESTOES)
Adicionar tema de estudo -> js/dados.js (lista AREAS)
Mudar textos da página   -> index.html
