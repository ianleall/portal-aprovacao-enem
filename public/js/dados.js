// ===== dados.js — todo o CONTEÚDO do site fica aqui =====
// Para adicionar um tema, uma questão ou mudar um texto, mexa só neste arquivo.
// Ele só guarda listas (arrays); quem desenha na tela são os outros arquivos.

// ---------- ABA ESTUDAR ----------
// Formato: [nome da área, emoji, [ [título do tema, dica curta, texto da busca], ... ]]
const AREAS = [
  ["Linguagens", "🗣️", [
    ["Interpretação de texto","Textos, charges e gráficos","interpretação de texto enem"],
    ["Variação linguística","Registro formal e informal","variação linguística enem"],
    ["Funções da linguagem","Emissor, receptor e intenção","funções da linguagem enem"],
    ["Figuras de linguagem","Metáfora, ironia, hipérbole","figuras de linguagem enem"],
    ["Literatura e movimentos","Modernismo e Romantismo","literatura modernismo romantismo enem"],
    ["Gêneros textuais e intertextualidade","Como os textos dialogam","gêneros textuais intertextualidade enem"]
  ]],
  ["Matemática", "📐", [
    ["Porcentagem, razão e proporção","Tema mais frequente","porcentagem razão proporção enem"],
    ["Estatística","Média, mediana, gráficos","estatística enem"],
    ["Probabilidade e combinatória","Chances e contagem","probabilidade análise combinatória enem"],
    ["Geometria plana","Áreas e perímetros","geometria plana enem"],
    ["Geometria espacial","Volumes e capacidade","geometria espacial enem"],
    ["Funções e gráficos","1º e 2º grau","funções enem"]
  ]],
  ["Ciências da Natureza", "🧪", [
    ["Ecologia","Cadeias, ciclos e impactos","ecologia enem"],
    ["Genética","Leis de Mendel e heredogramas","genética enem"],
    ["Evolução e biodiversidade","Seleção natural","evolução biodiversidade enem"],
    ["Estequiometria e soluções","Cálculos químicos","estequiometria soluções enem"],
    ["Eletricidade","Circuitos, potência, consumo","eletricidade enem"],
    ["Termologia e ondas","Calor, som e luz","termologia ondas enem"]
  ]],
  ["Ciências Humanas", "🌍", [
    ["Brasil República","Vargas, ditadura, redemocratização","história república enem"],
    ["Brasil Colônia e Império","Escravidão e independência","brasil colônia império enem"],
    ["Geopolítica e globalização","Blocos e conflitos","geopolítica globalização enem"],
    ["Clima e biomas","Geografia física do Brasil","clima biomas enem"],
    ["Urbanização e questão agrária","Cidade, campo e conflitos","urbanização questão agrária enem"],
    ["Filosofia e Sociologia","Cidadania, cultura, poder","filosofia sociologia enem"]
  ]]
];

// ---------- ABA REDAÇÃO: AS 5 COMPETÊNCIAS ----------
// Formato: [título, explicação]
const COMPETENCIAS = [
  ["1. Norma culta","Ortografia, acentuação, pontuação, concordância e regência. Evite gírias e erros de digitação."],
  ["2. Tema e tipo textual","Entender o tema, seguir o formato dissertativo-argumentativo e usar repertório sociocultural produtivo (que se liga ao argumento)."],
  ["3. Argumentação","Defender um ponto de vista com argumentos organizados, sem contradição e com informações que sustentem a tese."],
  ["4. Coesão","Ligar frases e parágrafos com conectivos variados e adequados (Todavia, Ademais, Logo...)."],
  ["5. Proposta de intervenção","Agente, ação, meio, detalhamento e finalidade, respeitando os direitos humanos."]
];

// ---------- ABA REDAÇÃO: ESTRUTURA EM CORES ----------
// Cada bloco (Introdução, Desenvolvimento 1...) tem uma lista de trechos.
// Formato do trecho: [cor, rótulo, molde, exemplo, alternativa?]
//   molde      = a frase com [lacunas] para o aluno preencher
//   exemplo    = a mesma frase já preenchida (redação simulada)
//   alternativa = true quando é uma opção "OU" (não entra no texto simulado)
const ESTRUTURA = {
  "Introdução": [
    ["#dc2626","Repertório","No [título da obra / lei / evento], de [ano], [desenvolvimento do repertório, use dois-pontos para esclarecer].","No romance “1984”, de George Orwell, publicado em 1949, um governo autoritário manipula fatos e reescreve a história: a verdade deixa de ser um dado e vira ferramenta de controle."],
    ["#ea580c","2A · Conexão com o tema","Nesse sentido, a obra se relaciona com [problema do tema] na medida em que [explicação].","Nesse sentido, a obra se relaciona com a desinformação na era digital na medida em que a circulação de mentiras também distorce a percepção coletiva da realidade."],
    ["#ea580c","OU 2B · Contraste (tese)","Todavia, a sociedade brasileira contraria o que foi ilustrado no repertório na medida em que [explicação].","Todavia, a sociedade brasileira contraria o que foi ilustrado no romance na medida em que a manipulação não vem de um Estado onipotente, mas de redes que espalham boatos sem controle.",true],
    ["#7c3aed","Antecipação argumentativa","Assim, a solução de [problema] pressupõe análise não só de [A1 + microcontexto], como também de [A2 + microcontexto].","Assim, a solução da desinformação pressupõe análise não só da carência de educação midiática nas escolas, como também da lógica dos algoritmos que privilegiam conteúdos sensacionalistas."]
  ],
  "Desenvolvimento 1": [
    ["#2563eb","Tópico frasal","À vista desse problema, [argumento 1, curto, claro e direto].","À vista desse problema, a falta de educação midiática impede que os cidadãos identifiquem informações falsas."],
    ["#16a34a","Fundamentação","Acerca disso, [repertório sociocultural que dialogue com A1].","Acerca disso, a Constituição Federal de 1988 assegura a educação como direito de todos, visando ao pleno exercício da cidadania."],
    ["#ea580c","3A · Brasil contradiz","Todavia, [repertório] evidencia contradição com a realidade brasileira, sobretudo em [problema].","Todavia, esse direito evidencia contradição com a realidade brasileira, sobretudo em escolas que não ensinam a checar fontes nem a analisar criticamente o que se lê na internet."],
    ["#ea580c","OU 3B · Brasil confirma","De forma análoga, [repertório] dialoga com a realidade brasileira, sobretudo em [problema].","De forma análoga, o texto constitucional dialoga com a realidade brasileira, sobretudo em jovens que compartilham boatos por falta de formação crítica.",true],
    ["#db2777","Antilacuna","(...), haja vista [mazela social concreta ou falta de política pública].","(...), haja vista a ausência de políticas públicas contínuas voltadas à leitura crítica de mídias."],
    ["#0f766e","Fechamento crítico","Logo, não é razoável que [direito relacionado] deixe de ser realidade no Brasil.","Logo, não é razoável que o direito à educação cidadã deixe de ser realidade no Brasil."]
  ],
  "Desenvolvimento 2": [
    ["#2563eb","Tópico frasal","Ademais, [argumento 2, curto, direto e ligado ao tema].","Ademais, os algoritmos das plataformas digitais ampliam o alcance de conteúdos falsos."],
    ["#16a34a","Fundamentação","Sobre isso, [repertório que dialogue com A2].","Sobre isso, o sociólogo Zygmunt Bauman, ao formular a “modernidade líquida”, descreve relações e informações marcadas pela rapidez e pela superficialidade."],
    ["#ea580c","3B · Brasil confirma","De forma análoga, [repertório] dialoga com a realidade brasileira, sobretudo em [problema]. (Pode usar 3A, como no D1.)","De forma análoga, a ideia de Bauman dialoga com a realidade brasileira, sobretudo em usuários que compartilham manchetes sem ler a notícia completa."],
    ["#db2777","Antilacuna (duas mazelas)","Esse problema pode ser exemplificado pela [mazela 1], bem como pela [mazela 2].","Esse problema pode ser exemplificado pela disseminação de boatos em períodos eleitorais, bem como pela circulação de falsas curas em saúde."],
    ["#0f766e","Fechamento · antítese","Desse modo, enquanto [problema] for a regra, [solução / direito] será a exceção.","Desse modo, enquanto a desinformação for a regra, o acesso a informações confiáveis será a exceção."]
  ],
  "Conclusão": [
    ["#a16207","Retomada da tese","Portanto, para que [problema] seja mitigado, [A1] e [A2] devem deixar de ser a realidade no Brasil.","Portanto, para que a desinformação seja mitigada, a falta de educação midiática e a lógica sensacionalista dos algoritmos devem deixar de ser a realidade no Brasil."],
    ["#dc2626","Proposta de intervenção","Para isso, o [agente] deve [ação], por meio de [meio], como [detalhamento], a fim de combater [A1] e [A2].","Para isso, o Ministério da Educação deve incluir a educação midiática no currículo, por meio de aulas de checagem de fatos, como oficinas com jornalistas e agências de checagem, a fim de combater o despreparo crítico e a circulação de conteúdos falsos."],
    ["#2563eb","Finalidade","Essa iniciativa terá a finalidade de [resultado / objetivo].","Essa iniciativa terá a finalidade de formar cidadãos capazes de reconhecer e questionar informações falsas."],
    ["#0f766e","Fechamento com repertório","Desse modo, a realidade ilustrada no repertório deixará de ser [situação], e [direito] deixará de ser apenas uma promessa.","Desse modo, a realidade ilustrada em “1984” deixará de ser uma ameaça para o Brasil, e a educação cidadã deixará de ser apenas uma promessa."]
  ]
};

// ---------- SIMULADO: BANCO DE QUESTÕES ----------
// Formato: [área, enunciado, [alternativas], índice da correta (0 = primeira), explicação]
const QUESTOES = [
  ["Linguagens","Em “Aquele jogador é um paredão”, o termo destacado é uma:",["Metáfora","Antítese","Onomatopeia","Pleonasmo"],0,"Há comparação implícita entre o jogador e uma parede, sem “como”: isso é metáfora."],
  ["Linguagens","O uso de gírias em uma conversa entre amigos exemplifica:",["Variação de registro informal","Erro gramatical grave","Linguagem técnica","Norma culta obrigatória"],0,"A língua varia conforme a situação. Entre amigos, o registro informal é adequado e não é erro."],
  ["Linguagens","Uma charge que critica o desperdício de água usa predominantemente a função:",["Referencial","Poética","Apelativa/crítica","Fática"],2,"A charge quer convencer e provocar mudança de atitude, o que caracteriza a função apelativa."],
  ["Matemática","Um produto de R$ 200 recebe 15% de desconto. O preço final é:",["R$ 170","R$ 185","R$ 150","R$ 175"],0,"15% de 200 = 30. Preço final: 200 − 30 = 170."],
  ["Matemática","Notas de um aluno: 6, 8, 7, 9. A média é:",["7","7,5","8","6,5"],1,"Soma = 30; 30 ÷ 4 = 7,5."],
  ["Matemática","Um carro percorre 150 km em 2 h. A velocidade média é:",["60 km/h","75 km/h","90 km/h","300 km/h"],1,"Velocidade = distância ÷ tempo = 150 ÷ 2 = 75 km/h."],
  ["Matemática","Um quadrado tem lado 5 cm. Sua área é:",["10 cm²","20 cm²","25 cm²","15 cm²"],2,"Área do quadrado = lado × lado = 5 × 5 = 25 cm²."],
  ["Natureza","A organela responsável pela respiração celular é a:",["Ribossomo","Mitocôndria","Lisossomo","Golgi"],1,"A mitocôndria produz ATP na respiração celular. O ribossomo sintetiza proteínas."],
  ["Natureza","Em uma cadeia alimentar, os produtores são:",["Fungos","Herbívoros","Plantas e algas","Carnívoros"],2,"Produtores fazem fotossíntese e fabricam a própria matéria orgânica: plantas e algas."],
  ["Natureza","Dois alelos Aa × Aa. A chance de descendente aa é:",["0%","25%","50%","100%"],1,"O cruzamento gera AA, Aa, Aa e aa, ou seja, 1 em 4 (25%)."],
  ["Natureza","Um aparelho de 1000 W funciona por 2 h. O consumo é de:",["500 Wh","1 kWh","2 kWh","20 kWh"],2,"1000 W = 1 kW. Energia = potência × tempo = 1 × 2 = 2 kWh."],
  ["Humanas","A Era Vargas ocorreu entre:",["1889 e 1930","1930 e 1945","1946 e 1964","1964 e 1985"],1,"Getúlio Vargas governou de 1930 a 1945 (Governo Provisório, Constitucional e Estado Novo)."],
  ["Humanas","A globalização se caracteriza principalmente por:",["Isolamento das economias","Integração econômica e cultural","Fim das fronteiras políticas","Queda do comércio"],1,"Globalização é a intensa integração entre países por comércio, tecnologia e cultura. As fronteiras continuam existindo."],
  ["Humanas","A Lei Áurea, de 1888, determinou:",["O fim da escravidão no Brasil","A Proclamação da República","O voto feminino","A independência"],0,"Assinada pela Princesa Isabel, a Lei Áurea aboliu a escravidão. A República veio em 1889."],
  ["Humanas","Para a Sociologia, “cultura” inclui:",["Apenas obras de arte","Hábitos, valores e costumes de um grupo","Só tradições antigas","Somente o idioma"],1,"Em Sociologia, cultura é o conjunto de práticas, crenças e valores compartilhados por um grupo."],
  ["Redação","Na proposta de intervenção, o “agente” indica:",["Quem executa a ação","Para que serve","Como será feita","O problema"],0,"Agente = quem vai agir (Governo, escola, mídia...). A finalidade diz “para quê”."],
  ["Linguagens","Em “O sol sorria para as crianças”, ocorre:",["Hipérbole","Prosopopeia","Eufemismo","Ironia"],1,"Atribuir ação humana (sorrir) a um elemento da natureza é prosopopeia (personificação)."],
  ["Linguagens","“Ele partiu desta para melhor” é um exemplo de:",["Eufemismo","Pleonasmo","Antítese","Onomatopeia"],0,"O eufemismo suaviza uma ideia desagradável, aqui a morte."],
  ["Linguagens","Em “Que ótimo, perdi o ônibus de novo!”, a expressão “Que ótimo” indica:",["Alegria sincera","Ironia","Metonímia","Denotação"],1,"O sentido dito é o oposto do sentido pretendido: ironia."],
  ["Linguagens","Em “Marina, minha vizinha, é médica”, as vírgulas isolam um:",["Vocativo","Aposto","Adjunto adverbial","Sujeito"],1,"“Minha vizinha” explica e se refere a Marina: é um aposto."],
  ["Linguagens","Complete: “Fui ___ escola ontem.”",["a","há","às","à"],3,"Ir a (preposição) + a escola (artigo) forma a crase: à."],
  ["Linguagens","Segundo a norma-padrão, está correta a frase:",["Fazem dois anos que moro aqui.","Faz dois anos que moro aqui.","Haviam muitas pessoas na fila.","Houveram vários problemas."],1,"Fazer indicando tempo e haver com sentido de existir são impessoais: ficam no singular."],
  ["Linguagens","Qual autor pertence ao Modernismo brasileiro?",["José de Alencar","Castro Alves","Carlos Drummond de Andrade","Gonçalves Dias"],2,"Drummond é um dos grandes nomes do Modernismo. Os demais são do Romantismo."],
  ["Linguagens","Quando um texto retoma ou dialoga com outro, ocorre:",["Coesão","Intertextualidade","Denotação","Pleonasmo"],1,"Intertextualidade é o diálogo entre textos, por citação, paródia ou alusão."],
  ["Matemática","3 canetas custam R$ 12. Quanto custam 5 canetas iguais?",["R$ 18","R$ 15","R$ 20","R$ 22"],2,"Cada caneta custa 12 ÷ 3 = 4; 5 × 4 = 20."],
  ["Matemática","A mediana do conjunto 3, 7, 9, 12, 15 é:",["7","9","12","9,2"],1,"Com 5 valores em ordem, a mediana é o do meio: 9."],
  ["Matemática","Ao lançar um dado comum, a probabilidade de sair número par é:",["1/6","1/3","1/2","2/3"],2,"Pares: 2, 4 e 6, ou seja, 3 de 6 = 1/2."],
  ["Matemática","De quantas formas 3 pessoas podem formar uma fila?",["3","6","9","12"],1,"Permutação: 3! = 3 × 2 × 1 = 6."],
  ["Matemática","O volume de um cubo de aresta 3 cm é:",["9 cm³","18 cm³","27 cm³","81 cm³"],2,"Volume = aresta³ = 3 × 3 × 3 = 27."],
  ["Matemática","Se f(x) = 2x + 3, então f(4) vale:",["8","9","11","14"],2,"Substituindo: 2 × 4 + 3 = 11."],
  ["Matemática","A área de um triângulo de base 10 cm e altura 6 cm é:",["16 cm²","30 cm²","60 cm²","48 cm²"],1,"Área = base × altura ÷ 2 = 10 × 6 ÷ 2 = 30."],
  ["Natureza","O processo em que plantas produzem glicose usando luz é a:",["Respiração","Fotossíntese","Fermentação","Digestão"],1,"Na fotossíntese, luz, água e CO₂ geram glicose e oxigênio."],
  ["Natureza","Um dos principais gases do efeito estufa, liberado na queima de combustíveis fósseis, é o:",["Oxigênio","Nitrogênio","Dióxido de carbono","Hélio"],2,"A queima de combustíveis libera CO₂, que retém calor na atmosfera."],
  ["Natureza","A passagem do estado líquido para o gasoso é chamada de:",["Fusão","Solidificação","Condensação","Vaporização"],3,"Líquido para gás é vaporização. Condensação é o caminho inverso."],
  ["Natureza","Uma solução com pH 3 é:",["Ácida","Neutra","Básica","Alcalina"],0,"pH abaixo de 7 é ácido; 7 é neutro; acima de 7 é básico."],
  ["Natureza","Ao frear bruscamente, os passageiros de um ônibus são lançados para a frente. Isso é explicado pela:",["Ação e reação","Gravidade","Inércia","Força elétrica"],2,"Pela inércia, o corpo tende a manter o movimento que já tinha."],
  ["Natureza","Fungos e bactérias em um ecossistema atuam principalmente como:",["Produtores","Consumidores primários","Predadores","Decompositores"],3,"Eles degradam matéria orgânica e devolvem nutrientes ao ambiente."],
  ["Natureza","Qual base nitrogenada existe no RNA, mas não no DNA?",["Timina","Uracila","Adenina","Guanina"],1,"O RNA tem uracila no lugar da timina."],
  ["Humanas","A Proclamação da República no Brasil ocorreu em:",["1822","1888","1889","1930"],2,"Em 15 de novembro de 1889, o Império chegou ao fim."],
  ["Humanas","A Revolução Industrial teve início em qual país?",["França","Inglaterra","Estados Unidos","Alemanha"],1,"Começou na Inglaterra, no século XVIII, com a mecanização da produção."],
  ["Humanas","A Guerra Fria opôs principalmente:",["França e Alemanha","China e Japão","EUA e URSS","Brasil e Argentina"],2,"Foi a disputa de influência entre as superpotências EUA (capitalista) e URSS (socialista)."],
  ["Humanas","O bioma predominante no interior do Nordeste, com vegetação adaptada à seca, é:",["Cerrado","Caatinga","Pampa","Mata Atlântica"],1,"A Caatinga tem clima semiárido e plantas adaptadas à pouca água."],
  ["Humanas","O êxodo rural é o movimento de pessoas:",["Da cidade para o exterior","Do campo para a cidade","Entre países vizinhos","Da cidade para o campo"],1,"Êxodo rural é a migração do campo para os centros urbanos."],
  ["Humanas","Para Karl Marx, a sociedade capitalista se divide principalmente em:",["Nobreza e clero","Burguesia e proletariado","Senhores e servos","Patrícios e plebeus"],1,"Burguesia (donos dos meios de produção) e proletariado (trabalhadores)."],
  ["Humanas","A Constituição brasileira de 1988 é conhecida como:",["Constituição Imperial","Constituição Cidadã","Constituição do Estado Novo","Carta Outorgada"],1,"Recebeu esse nome por ampliar direitos e garantias da população."]
];
