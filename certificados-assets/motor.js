/* Motor dos certificados do Instituto Dell'Isola — dados, desenho, PDF e ZIP.
   Compartilhado pelas três saídas: o arquivo offline de dois cliques, a página
   pública do aluno e o emissor completo. A interface de cada uma fica no HTML
   dela; aqui não há nada que dependa de um botão existir.
   Gerado por build.py a partir de motor.src.js — não editar a cópia. */
"use strict";

/* ========================= dados ========================= */

const ARTES = {
  turquesa: "../certificados-assets/turquesa.jpg",
  dourado:  "../certificados-assets/dourado.jpg",
  marinho:  "../certificados-assets/marinho.jpg",
};
const PROGRAMA_PNL = [
  "../certificados-assets/pnl_programa1.jpg",
  "../certificados-assets/pnl_programa2.jpg",
  "../certificados-assets/pnl_programa3.jpg",
];

const PROFESSOR = "Alberto Dell'Isola";

/* Cores da moldura. A arte turquesa é quase monocromática (182,5° em 94% dos
   pixels coloridos), então girar o matiz preserva todo o desenho fino — é o
   mesmo caminho que o próprio designer usou para fazer a versão dourada.

   `k` multiplica a luz só onde há cor, com peso na saturação: o fundo branco e
   a assinatura preta não se mexem. Cada valor foi resolvido medindo o contraste
   da palavra CERTIFICADO sobre o fundo até cair na faixa de 3,05 a 4,85:1 —
   toda cor abaixo lê pelo menos tão bem quanto o turquesa em uso hoje (2,88:1).
   Roxo e vinho puros saem neon nesses matizes; por isso levam `ms` < 1. */
const CORES = [
  { id:"turquesa",  nome:"Turquesa",   original:true,          am:"#19A2A7" },  // 2,88:1
  { id:"verde",     nome:"Verde",      h:150, ms:1.00, k:0.9354, am:"#15A258" },  // 3,07:1
  { id:"azul",      nome:"Azul",       h:216, ms:1.00, k:1.8127, am:"#1A67DC" },  // 4,85:1
  { id:"ameixa",    nome:"Ameixa",     h:278, ms:0.52, k:1.0000, am:"#895CA7" },  // 4,69:1
  { id:"bordo",     nome:"Bordô",      h:352, ms:0.80, k:1.4340, am:"#C33A4F" },  // 4,82:1
  { id:"terracota", nome:"Terracota",  h:20,  ms:1.00, k:1.2906, am:"#BB4817" },  // 4,81:1
  { id:"grafite",   nome:"Grafite",    h:205, ms:0.28, k:0.9210, am:"#7A91A0" },  // 3,05:1
];
const H_ARTE = 182.5;                   // matiz da arte turquesa original
const MODELO_COLORIVEL = "turquesa";    // só esta arte é monocromática

/* Cursos extraídos do design do Canva. `larg` é a largura da caixa de texto
   medida no original — é ela que decide onde a frase quebra de linha. */
const CURSOS = [
  {t:"Practitioner em PNL Científica", h:30, m:"marinho", larg:937, programa:true},
  {t:"Formação em Hipnose Clínica Científica", h:60, m:"dourado", larg:755.2},
  {t:"Formação em Hipnose Clássica", h:20, m:"turquesa", larg:788.8},
  {t:"Hipnose Para Tratar Vícios", f:"Como Tratar Vícios", h:20, m:"turquesa", larg:777.4, cor:"terracota"},
  {t:"Hipnose Para o Controle da Ansiedade", h:30, m:"turquesa", larg:813.5},
  {t:"Imersão Em Hipnose Para Manejo de Dor", h:9, m:"turquesa", larg:801.2, cor:"verde"},
  {t:"Auto-Hipnose Científica", h:20, m:"turquesa", larg:777.1},
  {t:"Formação em Fundamentos da Hipnose", f:"Fundamentos da Hipnose", h:20, m:"turquesa", larg:807.7},
  {t:"Induções Rápidas e Instantâneas", h:3, m:"turquesa", larg:804},
  {t:"Formação Em Terapia Online", h:22, m:"turquesa", larg:767.2},
  {t:"Formação em Hipnose Conversacional", h:19, m:"turquesa", larg:755.2},
  {t:"Hipnose Não Verbal E Neurociências", f:"Formação Hipnose Não Verbal E Neurociências", h:10, m:"turquesa", larg:779.9},
  {t:"Imersão Em Hipnose Conversacional", h:16, m:"turquesa", larg:728.4},
  {t:"Memorização e Aprendizagem Acelerada", f:"Formação Em Supermemória Para Provas e Concursos", h:20, m:"turquesa", larg:756.4},
  {t:"Imersão em Hipnose Ericksoniana", h:9, m:"turquesa", larg:803.3},
  {t:"Auto-hipnose e Meditação Para Provas e Concursos", h:15, m:"turquesa", larg:807.3},
  {t:"Leitura Rápida", h:3, m:"turquesa", larg:804.7},
  {t:"Imersão em Sleight Of Mouth", h:6, m:"turquesa", larg:770.7},
  {t:"Imersão em PNL Científica", h:16, m:"turquesa", larg:816.7},
  {t:"Hipnose Regressiva e Terapia de Partes", h:16, m:"turquesa", larg:735.4, cor:"bordo"},
  {t:"Como Estudar Hipnose de Fontes Confiáveis", h:3, m:"turquesa", larg:804.5},
  /* Fora do design do Canva: curso da Hotmart, acrescentado em 23/09/2026.
     Sem medida de caixa original, então usa a largura padrão de 805. */
  {t:"Aprenda Hipnose do Zero", h:40, m:"turquesa", larg:805, cor:"azul"},
];

/* Página em unidades do design: 1414 x 1000. Todas as medidas abaixo foram
   lidas do próprio documento do Canva (posição da caixa, corpo, entrelinha). */
const P_LARG = 1414, P_ALT = 1000, MEIO = P_LARG / 2;

/* `fs` é o corpo REAL medido no render do Canva, não o font-size que o CSS
   do editor informa — o editor aplica uma escala e os dois diferem ~10,6%.
   Cada valor saiu da razão entre a largura da tinta original e a nossa,
   sobre 5 páginas (desvio de 0,0003). */
/* `fs` é o corpo REAL medido no render do Canva, não o font-size que o CSS do
   editor informa — o editor aplica uma escala e os dois diferem ~10,6%. Cada
   valor saiu da razão entre a largura da tinta original e a nossa, sobre 5
   páginas (desvio de 0,0003). `y` já traz a correção vertical medida. */
const CLARO = {
  titulo:{y:295.63, dx:-0.77, fs:38.343, lh:41,   ff:"Arimo",        pe:400},
  frase: {y:371.63, dx:-2.67, fs:32.329, lh:35,   ff:"Montserrat",   pe:500, txt:"Certificamos por esse documento que"},
  nome:  {y:433.60, dx:-1.70, fs:74.340, lh:80,   ff:"DancingScript",pe:400},
  desc:  {y:530.43, fs:28.075, lh:33.2, ff:"Montserrat",   pe:500},
  data:  {y:622.87, fs:22.110, lh:24,   ff:"Montserrat",   pe:500, base:2},
  assina:{y:770.63, fs:28.006, lh:36,   ff:"Montserrat",   pe:500, txt:"Alberto Dell´Isola"},
  inst:  {y:810.33, fs:22.126, lh:28,   ff:"Montserrat",   pe:500, txt:"Instituto Dell’Isola"},
  cor:"#000000",
};
const LAYOUT = {
  turquesa: CLARO,
  dourado:  CLARO,
  marinho: {
    nome:{y:385.63, fs:74.375, lh:80,   ff:"DancingScript",pe:400},
    desc:{y:515.47, fs:28.020, lh:33.33,ff:"Montserrat",   pe:500},
    data:{y:607.79, fs:22.188, lh:24,   ff:"Montserrat",   pe:500, base:2},
    cor:"#ffffff",
  },
};

/* A largura medida no original é a da linha mais larga; sem esta folga uma
   linha limítrofe quebra uma palavra antes. 8 unidades é menos que a menor
   palavra + espaço, então nunca puxa palavra da linha seguinte. */
const FOLGA_QUEBRA = 8;

/* ========================= util ========================= */

const $ = (s) => document.querySelector(s);
const imgs = {};

function carregarImagem(src){
  if (imgs[src]) return imgs[src];
  imgs[src] = new Promise((ok, ruim) => {
    const im = new Image();
    im.onload = () => ok(im);
    im.onerror = () => ruim(new Error("imagem não carregou"));
    im.src = src;
  });
  return imgs[src];
}

const doisDig = (n) => String(n).padStart(2, "0");

/* ---------- recoloração da moldura ---------- */

const paraLinear = (() => {
  const t = new Float32Array(256);
  for (let i = 0; i < 256; i++){
    const c = i / 255;
    t[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  return t;
})();

const paraSRGB = (l) => 255 * (l <= 0.0031308 ? l * 12.92 : 1.055 * Math.pow(l, 1 / 2.4) - 0.055);

function recolorirPixels(dados, cor){
  const d = dados.data, delta = cor.h - H_ARTE;
  for (let i = 0; i < d.length; i += 4){
    const R = d[i], G = d[i + 1], B = d[i + 2];
    const mx = Math.max(R, G, B), mn = Math.min(R, G, B), dif = mx - mn;
    if (!dif) continue;                                  // cinza puro: não tem matiz a girar
    const s = dif / mx;
    let h;
    if (mx === R)      h = ((G - B) / dif + 6) % 6;
    else if (mx === G) h = (B - R) / dif + 2;
    else               h = (R - G) / dif + 4;
    h = (h * 60 + delta) % 360; if (h < 0) h += 360;

    const v = mx / 255, s2 = Math.min(s * cor.ms, 1);
    const c = v * s2, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
    let r, g, b;
    const f = Math.floor(h / 60) % 6;
    if (f === 0)      { r = c; g = x; b = 0; }
    else if (f === 1) { r = x; g = c; b = 0; }
    else if (f === 2) { r = 0; g = c; b = x; }
    else if (f === 3) { r = 0; g = x; b = c; }
    else if (f === 4) { r = x; g = 0; b = c; }
    else              { r = c; g = 0; b = x; }

    // a luz muda com peso na saturação original: fundo branco e traço preto ficam
    const peso = 1 + s * (cor.k - 1);
    let lr = paraLinear[Math.round((r + m) * 255)] * peso;
    let lg = paraLinear[Math.round((g + m) * 255)] * peso;
    let lb = paraLinear[Math.round((b + m) * 255)] * peso;
    const excesso = Math.max(Math.max(lr, lg, lb) - 1, 0);
    if (excesso > 0){                                    // estouro clareia p/ branco
      const dv = 1 + excesso;
      lr = (lr + excesso) / dv; lg = (lg + excesso) / dv; lb = (lb + excesso) / dv;
    }
    d[i]     = paraSRGB(Math.min(Math.max(lr, 0), 1));
    d[i + 1] = paraSRGB(Math.min(Math.max(lg, 0), 1));
    d[i + 2] = paraSRGB(Math.min(Math.max(lb, 0), 1));
  }
  return dados;
}

const cacheArte = {};
async function arteDe(curso){
  const base = await carregarImagem(ARTES[curso.m]);
  const cor = CORES.find(c => c.id === corDoCurso(curso));
  if (curso.m !== MODELO_COLORIVEL || !cor || cor.original) return base;

  const chave = curso.m + "|" + cor.id;
  if (!cacheArte[chave]){
    const cv = document.createElement("canvas");
    cv.width = base.naturalWidth; cv.height = base.naturalHeight;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(base, 0, 0);
    const px = ctx.getImageData(0, 0, cv.width, cv.height);
    ctx.putImageData(recolorirPixels(px, cor), 0, 0);
    cacheArte[chave] = cv;
  }
  return cacheArte[chave];
}

function dataBR(iso){
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

function limparNome(s){
  return s.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ").trim();
}

function cursoAtual(){
  const i = +$("#curso").value;
  return todosCursos()[i];
}

function todosCursos(){
  return CURSOS.concat(meusCursos());
}

function meusCursos(){
  try { return JSON.parse(localStorage.getItem("certificados.cursos") || "[]"); }
  catch { return []; }
}

function gravarMeus(lista){
  localStorage.setItem("certificados.cursos", JSON.stringify(lista));
}

/* a cor escolhida fica guardada por curso, pelo título */
function coresSalvas(){
  try { return JSON.parse(localStorage.getItem("certificados.cores") || "{}"); }
  catch { return {}; }
}

function corDoCurso(curso){
  return coresSalvas()[curso.t] || curso.cor || "turquesa";
}

function gravarCorDoCurso(curso, corId){
  const m = coresSalvas();
  if (corId === "turquesa") delete m[curso.t]; else m[curso.t] = corId;
  localStorage.setItem("certificados.cores", JSON.stringify(m));
}

function frase(c){
  return `concluiu com sucesso o curso ${c.f || c.t}, com carga horária de ${doisDig(c.h)} Horas, ministrado por ${PROFESSOR}.`;
}

/* ========================= desenho ========================= */

function fonte(ctx, b){ ctx.font = `${b.pe} ${b.fs}px '${b.ff}'`; }

/* linha de base seguindo o meio-espaçamento do CSS, com as métricas da fonte */
function baseDe(ctx, topo, lh){
  const m = ctx.measureText("Hxgy");
  const asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
  return topo + (lh - (asc + desc)) / 2 + asc;
}

function quebrar(ctx, texto, larg){
  const palavras = texto.split(" ");
  const linhas = [];
  let atual = "";
  for (const p of palavras){
    const tenta = atual ? atual + " " + p : p;
    if (atual && ctx.measureText(tenta).width > larg){ linhas.push(atual); atual = p; }
    else atual = tenta;
  }
  if (atual) linhas.push(atual);
  return linhas;
}

function escreverLinhas(ctx, b, linhas, topo){
  fonte(ctx, b);
  const x = MEIO + (b.dx || 0);
  let base = baseDe(ctx, topo, b.lh);
  for (const l of linhas){ ctx.fillText(l, x, base); base += b.lh; }
}

function escrever(ctx, b, texto, topo){
  escreverLinhas(ctx, b, [texto], topo === undefined ? b.y : topo);
}

/* A descrição só cabe em 3 linhas: na quarta, a data encosta na assinatura.
   Curso com nome comprido primeiro ganha caixa mais larga; se ainda não couber,
   o corpo diminui. Os 21 cursos do Canva passam sem tocar em nada disso. */
const MAX_LINHAS = 3, LARG_TETO = 1010;

/* Título e nome do aluno saem numa linha só. Passando destas larguras o texto
   invadiria a moldura, então o corpo cede — a largura é o limite, não o corpo.
   O título mais longo do Canva tem 764 e o nome mais longo 1056: nenhum
   dos 21 cursos originais chega a encolher. */
const LARG_MAX_TITULO = 940, LARG_MAX_NOME = 1120;

function encolherPara(ctx, bloco, texto, largMax, fsMin){
  fonte(ctx, bloco);
  const w = ctx.measureText(texto).width;
  if (w <= largMax || !w) return bloco;
  return { ...bloco, fs: bloco.fs * Math.max(fsMin / bloco.fs, largMax / w) };
}

function ajustarDescricao(ctx, base, texto, largura){
  let bloco = base, larg = largura, linhas;
  fonte(ctx, bloco);
  linhas = quebrar(ctx, texto, larg);
  while (linhas.length > MAX_LINHAS && larg < LARG_TETO){
    larg = Math.min(larg + 40, LARG_TETO);
    linhas = quebrar(ctx, texto, larg);
  }
  while (linhas.length > MAX_LINHAS && bloco.fs > 20){
    bloco = { ...bloco, fs: bloco.fs * 0.96 };
    fonte(ctx, bloco);
    linhas = quebrar(ctx, texto, larg);
  }
  return { bloco, linhas };
}

async function desenhar(ctx, escala, dados){
  const { curso, nome, cidade, dataISO } = dados;
  const L = LAYOUT[curso.m] || CLARO;

  ctx.setTransform(escala, 0, 0, escala, 0, 0);
  ctx.clearRect(0, 0, P_LARG, P_ALT);

  const arte = await arteDe(curso);
  ctx.drawImage(arte, 0, 0, P_LARG, P_ALT);

  ctx.fillStyle = L.cor;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  if (L.titulo) escrever(ctx, encolherPara(ctx, L.titulo, curso.t, LARG_MAX_TITULO, 24), curso.t);
  if (L.frase)  escrever(ctx, L.frase, L.frase.txt);

  const txtNome = nome || " ";
  escrever(ctx, encolherPara(ctx, L.nome, txtNome, LARG_MAX_NOME, 40), txtNome);

  const bDesc = ajustarDescricao(ctx, L.desc, frase(curso), (curso.larg || 805) + FOLGA_QUEBRA);
  escreverLinhas(ctx, bDesc.bloco, bDesc.linhas, L.desc.y);
  const linhas = bDesc.linhas;

  const yData = L.data.y + L.desc.lh * (linhas.length - L.data.base);
  escrever(ctx, L.data, `${cidade}, ${dataBR(dataISO)}`, yData);

  if (L.assina) escrever(ctx, L.assina, L.assina.txt);
  if (L.inst)   escrever(ctx, L.inst, L.inst.txt);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/* ========================= PDF ========================= */

/* PDF mínimo: uma página A4 paisagem por imagem JPEG (DCTDecode). */
function montarPDF(paginas){
  const A4L = 841.89, A4A = 595.28;
  const cod = new TextEncoder();
  const partes = [];
  let tam = 0;
  const push = (b) => { const u = typeof b === "string" ? cod.encode(b) : b; partes.push(u); tam += u.length; };

  const objs = [];                          // deslocamento de cada objeto
  const nObjs = 2 + paginas.length * 3;
  const marcar = () => objs.push(tam);

  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");

  marcar();                                  // 1: catálogo
  push("1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n");

  const kids = paginas.map((_, i) => `${3 + i * 3} 0 R`).join(" ");
  marcar();                                  // 2: árvore de páginas
  push(`2 0 obj\n<</Type/Pages/Kids[${kids}]/Count ${paginas.length}>>\nendobj\n`);

  paginas.forEach((pg, i) => {
    const nPag = 3 + i * 3, nCont = nPag + 1, nImg = nPag + 2;
    marcar();
    push(`${nPag} 0 obj\n<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${A4L} ${A4A}]`
       + `/Resources<</XObject<</Im0 ${nImg} 0 R>>>>/Contents ${nCont} 0 R>>\nendobj\n`);

    const fluxo = `q ${A4L} 0 0 ${A4A} 0 0 cm /Im0 Do Q`;
    marcar();
    push(`${nCont} 0 obj\n<</Length ${fluxo.length}>>\nstream\n${fluxo}\nendstream\nendobj\n`);

    marcar();
    push(`${nImg} 0 obj\n<</Type/XObject/Subtype/Image/Width ${pg.w}/Height ${pg.a}`
       + `/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ${pg.bytes.length}>>\nstream\n`);
    push(pg.bytes);
    push("\nendstream\nendobj\n");
  });

  const inicioXref = tam;
  let xref = `xref\n0 ${nObjs + 1}\n0000000000 65535 f \n`;
  for (const off of objs) xref += String(off).padStart(10, "0") + " 00000 n \n";
  push(xref);
  push(`trailer\n<</Size ${nObjs + 1}/Root 1 0 R>>\nstartxref\n${inicioXref}\n%%EOF\n`);

  const saida = new Uint8Array(tam);
  let p = 0;
  for (const u of partes){ saida.set(u, p); p += u.length; }
  return new Blob([saida], { type: "application/pdf" });
}

async function jpegDaTela(cv, q = 0.93){
  const blob = await new Promise((ok) => cv.toBlob(ok, "image/jpeg", q));
  return { bytes: new Uint8Array(await blob.arrayBuffer()), w: cv.width, a: cv.height };
}

async function paginasDoCertificado(dados, escala){
  const cv = document.createElement("canvas");
  cv.width = Math.round(P_LARG * escala);
  cv.height = Math.round(P_ALT * escala);
  await desenhar(cv.getContext("2d"), escala, dados);
  const pags = [await jpegDaTela(cv)];

  if (dados.curso.programa){
    for (const src of PROGRAMA_PNL){
      const im = await carregarImagem(src);
      const c2 = document.createElement("canvas");
      c2.width = cv.width; c2.height = cv.height;
      c2.getContext("2d").drawImage(im, 0, 0, c2.width, c2.height);
      pags.push(await jpegDaTela(c2, 0.9));
    }
  }
  return pags;
}

/* ========================= ZIP (sem compressão) ========================= */

const tabelaCRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++){
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(u8){
  let c = 0xFFFFFFFF;
  for (let i = 0; i < u8.length; i++) c = tabelaCRC[(c ^ u8[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function montarZIP(arquivos){
  const cod = new TextEncoder();
  const locais = [], central = [];
  let desl = 0;

  for (const a of arquivos){
    const nome = cod.encode(a.nome);
    const dados = a.dados;
    const crc = crc32(dados);

    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true);
    lh.setUint16(8, 0, true); lh.setUint16(10, 0, true); lh.setUint16(12, 0, true);
    lh.setUint32(14, crc, true); lh.setUint32(18, dados.length, true); lh.setUint32(22, dados.length, true);
    lh.setUint16(26, nome.length, true); lh.setUint16(28, 0, true);
    locais.push(new Uint8Array(lh.buffer), nome, dados);

    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true);
    ch.setUint16(8, 0x0800, true); ch.setUint16(10, 0, true);
    ch.setUint16(12, 0, true); ch.setUint16(14, 0, true);
    ch.setUint32(16, crc, true); ch.setUint32(20, dados.length, true); ch.setUint32(24, dados.length, true);
    ch.setUint16(28, nome.length, true); ch.setUint16(30, 0, true); ch.setUint16(32, 0, true);
    ch.setUint16(34, 0, true); ch.setUint16(36, 0, true); ch.setUint32(38, 0, true);
    ch.setUint32(42, desl, true);
    central.push(new Uint8Array(ch.buffer), nome);

    desl += 30 + nome.length + dados.length;
  }

  const tamCentral = central.reduce((s, u) => s + u.length, 0);
  const fim = new DataView(new ArrayBuffer(22));
  fim.setUint32(0, 0x06054b50, true); fim.setUint16(4, 0, true); fim.setUint16(6, 0, true);
  fim.setUint16(8, arquivos.length, true); fim.setUint16(10, arquivos.length, true);
  fim.setUint32(12, tamCentral, true); fim.setUint32(16, desl, true); fim.setUint16(20, 0, true);

  return new Blob([...locais, ...central, new Uint8Array(fim.buffer)], { type: "application/zip" });
}

function baixar(blob, nome){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = nome;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}


/* ========================= fontes ========================= */

/* O canvas desenha com a fonte que estiver pronta NA HORA. Se o certificado for
   gerado antes do woff2 chegar, ele sai com a fonte do sistema e ninguém vê erro
   nenhum — por isso toda página espera por isto antes do primeiro desenho. */
async function aguardarFontes(){
  await Promise.all([
    document.fonts.load("500 25px 'Montserrat'"),
    document.fonts.load("700 25px 'Montserrat'"),
    document.fonts.load("400 25px 'Montserrat'"),
    document.fonts.load("400 66px 'DancingScript'"),
    document.fonts.load("400 34px 'Arimo'"),
  ]);
  await document.fonts.ready;
}

/* O nome do arquivo é o mesmo nas três saídas. */
function nomeArquivo(c, nome, ext){
  return `Certificado - ${limparNome(c.t)} - ${limparNome(nome)}.${ext}`;
}
