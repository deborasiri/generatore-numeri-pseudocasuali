// genera numeri da diverse distribuzioni partendo da U[0,1)

function uniforme(n) {
  let dati = [];
  for (let i = 0; i < n; i++) dati.push(Math.random());
  return dati;
}

function esponenziale(n, lambda) {
  // inversione CDF: X = -log(U) / lambda
  let dati = [];
  for (let i = 0; i < n; i++) dati.push(-Math.log(Math.random()) / lambda);
  return dati;
}

function normale(n) {
  // Box-Muller
  let dati = [];
  for (let i = 0; i < n; i++) {
    let u = Math.random(), v = Math.random();
    dati.push(Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
  }
  return dati;
}

function chiQuadro(n) {
  // chi-quadro con 2 gradi di liberta: X = -2*log(U)
  let dati = [];
  for (let i = 0; i < n; i++) dati.push(-2 * Math.log(Math.random()));
  return dati;
}

function weibull(n, lambda, alpha) {
  // inversione CDF: X = (-log(U) / lambda)^(1/alpha)
  let dati = [];
  for (let i = 0; i < n; i++) dati.push(Math.pow(-Math.log(Math.random()) / lambda, 1 / alpha));
  return dati;
}

function welford(dati) {
  let count = 0, media = 0, M2 = 0;
  for (let x of dati) {
    count++;
    let delta = x - media;
    media += delta / count;
    M2 += delta * (x - media);
  }
  return { media: media.toFixed(4), varianza: (M2 / (count - 1)).toFixed(4) };
}

function istogramma(dati, canvas, colore) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let min = Math.min(...dati);
  let max = Math.max(...dati);
  let bins = 30;
  let cont = new Array(bins).fill(0);

  for (let x of dati) {
    let i = Math.min(Math.floor((x - min) / (max - min) * bins), bins - 1);
    cont[i]++;
  }

  let maxC = Math.max(...cont);
  let w = canvas.width / bins;

  ctx.fillStyle = colore;
  for (let i = 0; i < bins; i++) {
    let h = (cont[i] / maxC) * (canvas.height - 10);
    ctx.fillRect(i * w + 1, canvas.height - h, w - 2, h);
  }
}

function aggiorna() {
  let tipo = document.getElementById("tipo").value;
  let n = parseInt(document.getElementById("n").value);

  let input = uniforme(n);
  let output;

  if (tipo === "esponenziale") output = esponenziale(n, 1);
  else if (tipo === "normale")  output = normale(n);
  else if (tipo === "chiquadro") output = chiQuadro(n);
  else if (tipo === "weibull")  output = weibull(n, 1, 2);

  let wi = welford(input);
  let wo = welford(output);

  document.getElementById("info-input").textContent =
    "media: " + wi.media + "   varianza: " + wi.varianza;
  document.getElementById("info-output").textContent =
    "media: " + wo.media + "   varianza: " + wo.varianza;

  istogramma(input,  document.getElementById("c-input"),  "#4a90d9");
  istogramma(output, document.getElementById("c-output"), "#e07b3a");
}
