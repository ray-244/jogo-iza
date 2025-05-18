const formas = [
  { nome: "círculo", classe: "circle" },
  { nome: "quadrado", classe: "square" },
  { nome: "triângulo", classe: "triangle" },
];

const perguntas = [
  { texto: "Quantos círculos você vê?", forma: "circle" },
  { texto: "Quantos quadrados você vê?", forma: "square" },
  { texto: "Quantos triângulos você vê?", forma: "triangle" },
];

let perguntaAtual = 0;
let respostaCorreta = 0;

function gerarFormas(formaAlvo) {
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";
  const total = Math.floor(Math.random() * 3) + 2; // entre 2 e 4
  respostaCorreta = total;
  let formasArr = [];
  for (let i = 0; i < total; i++) {
    formasArr.push(formaAlvo);
  }
  while (formasArr.length < 6) {
    const outra = formas[Math.floor(Math.random() * formas.length)].classe;
    if (outra !== formaAlvo) formasArr.push(outra);
  }
  formasArr = embaralhar(formasArr);
  formasArr.forEach((f) => {
    const div = document.createElement("div");
    div.className = "shape " + f;
    gameArea.appendChild(div);
  });
}

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function mostrarPergunta() {
  const p = perguntas[perguntaAtual];
  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").style.display = "none";
  gerarFormas(p.forma);
  // Destaque visual e ícone da forma no enunciado
  const icones = {
    circle:
      '<span style="color:#ffb800;font-size:1.5em;vertical-align:middle;">&#11044;</span>',
    square:
      '<span style="color:#4ecb41;font-size:1.5em;vertical-align:middle;">&#9632;</span>',
    triangle:
      '<span style="color:#e12d2d;font-size:1.5em;vertical-align:middle;">&#9651;</span>',
  };
  const enunciado = `<b>${p.texto.replace(
    /(círculos|quadrados|triângulos)/i,
    '<span style=\\"color:#e12d2d;font-size:1.1em;\\">$1</span>'
  )}</b> ${icones[p.forma]}`;
  let headerP = document.querySelector("header p");
  if (headerP) headerP.innerHTML = enunciado;
  gerarRespostas();
}

function gerarRespostas() {
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  let opcoes = [respostaCorreta];
  while (opcoes.length < 3) {
    let n = Math.floor(Math.random() * 5) + 1;
    if (!opcoes.includes(n)) opcoes.push(n);
  }
  opcoes = embaralhar(opcoes);
  opcoes.forEach((num) => {
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.onclick = () => checarResposta(num);
    answersDiv.appendChild(btn);
  });
}

function checarResposta(num) {
  const feedback = document.getElementById("feedback");
  if (num === respostaCorreta) {
    feedback.textContent = "Parabéns!";
    feedback.style.color = "#4ecb41";
    document.getElementById("next-btn").style.display = "block";
  } else {
    feedback.textContent = "Tente novamente!";
    feedback.style.color = "#e12d2d";
  }
}

document.getElementById("next-btn").onclick = () => {
  perguntaAtual = (perguntaAtual + 1) % perguntas.length;
  mostrarPergunta();
};

window.onload = mostrarPergunta;
