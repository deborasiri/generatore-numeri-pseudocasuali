// -----------------------------------------------
// GENERATORI DI DISTRIBUZIONI
// -----------------------------------------------

function uniforme() {
  return Math.random();
}

function esponenziale(lambda) {
  var u = Math.random();
  return -Math.log(u) / lambda;
}

function normale() {
  // Formula di Box-Muller
  var u = Math.random();
  var v = Math.random();
  var x = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return x;
}

function chi2() {
  // Chi-quadrato con 2 gradi di liberta = esponenziale con lambda = 0.5
  var u = Math.random();
  return -2 * Math.log(u);
}

function weibull(lambda, alpha) {
  var u = Math.random();
  return Math.pow(-Math.log(u) / lambda, 1 / alpha);
}

function binomiale(n, p) {
  var x = 0;
  for (var i = 0; i < n; i++) {
    if (Math.random() < p) {
      x = x + 1;
    }
  }
  return x;
}

// -----------------------------------------------
// RICORRENZA DI WELFORD
// Calcola media e varianza senza salvare tutti i valori
// -----------------------------------------------

function welford(valori) {
  var n = 0;
  var media = 0;
  var M2 = 0;

  for (var i = 0; i < valori.length; i++) {
    var x = valori[i];
    n = n + 1;
    var delta = x - media;
    media = media + delta / n;
    var delta2 = x - media;
    M2 = M2 + delta * delta2;
  }

  var varianza = M2 / (n - 1);
  return { media: media, varianza: varianza };
}

// -----------------------------------------------
// FORMULA NAIVE 
// varianza = (somma x^2 - n * media^2) / (n-1)
// -----------------------------------------------

function naive(valori) {
  var n = valori.length;
  var somma = 0;
  var sommaQuadrati = 0;

  for (var i = 0; i < n; i++) {
    somma = somma + valori[i];
    sommaQuadrati = sommaQuadrati + valori[i] * valori[i];
  }

  var media = somma / n;
  var varianza = (sommaQuadrati - n * media * media) / (n - 1);
  return { media: media, varianza: varianza };
}

// -----------------------------------------------
// GENERA I NUMERI E MOSTRA I RISULTATI
// -----------------------------------------------

function genera() {
  var n = parseInt(document.getElementById("n").value);
  var dist = document.getElementById("dist").value;
  var valori = [];

  for (var i = 0; i < n; i++) {
    var val;
    if (dist === "uniforme")      val = uniforme();
    if (dist === "esponenziale")  val = esponenziale(1);
    if (dist === "normale")       val = normale();
    if (dist === "chi2")          val = chi2();
    if (dist === "weibull")       val = weibull(1, 2);
    if (dist === "binomiale")     val = binomiale(10, 0.5);
    valori.push(val);
  }

  var ris = welford(valori);

  var testo = "";
  testo += "Distribuzione: " + dist + "<br>";
  testo += "Numeri generati: " + n + "<br>";
  testo += "Media (Welford): " + ris.media.toFixed(6) + "<br>";
  testo += "Varianza (Welford): " + ris.varianza.toFixed(6) + "<br>";

  document.getElementById("risultati").innerHTML = testo;

  disegnaIstogramma(valori);
}

// -----------------------------------------------
// ISTOGRAMMA
// -----------------------------------------------

function disegnaIstogramma(valori) {
  var canvas = document.getElementById("grafico");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var min = valori[0];
  var max = valori[0];
  for (var i = 0; i < valori.length; i++) {
    if (valori[i] < min) min = valori[i];
    if (valori[i] > max) max = valori[i];
  }

  var numBarre = 30;
  var conteggi = [];
  for (var i = 0; i < numBarre; i++) conteggi.push(0);

  for (var i = 0; i < valori.length; i++) {
    var idx = Math.floor((valori[i] - min) / (max - min) * numBarre);
    if (idx === numBarre) idx = numBarre - 1;
    conteggi[idx]++;
  }

  var massimo = 0;
  for (var i = 0; i < conteggi.length; i++) {
    if (conteggi[i] > massimo) massimo = conteggi[i];
  }

  var larghezzaBarra = canvas.width / numBarre;
  for (var i = 0; i < numBarre; i++) {
    var altezza = (conteggi[i] / massimo) * (canvas.height - 20);
    ctx.fillStyle = "steelblue";
    ctx.fillRect(i * larghezzaBarra, canvas.height - altezza, larghezzaBarra - 2, altezza);
  }
}

// -----------------------------------------------
// SEQUENZA PATOLOGICA
// -----------------------------------------------

function mostraPatologica() {
  var valori = [];
  var base = 1e8; // cento milioni
  for (var i = 0; i < 1000; i++) {
    valori.push(base + Math.random()); // numeri tipo 100000000.xxxx
  }

  var risNaive   = naive(valori);
  var risWelford = welford(valori);

  var varianzaVera = 1 / 12;

  var testo = "";
  testo += "Valori generati: 1000 numeri tipo 100.000.000 + uniforme[0,1]<br>";
  testo += "Varianza vera attesa: " + varianzaVera.toFixed(8) + "<br><br>";
  testo += "<b>Formula naive</b><br>";
  testo += "Media: " + risNaive.media.toFixed(8) + "<br>";
  testo += "Varianza: " + risNaive.varianza.toFixed(8) + " &larr; puo' essere imprecisa o negativa!<br><br>";
  testo += "<b>Ricorrenza di Welford</b><br>";
  testo += "Media: " + risWelford.media.toFixed(8) + "<br>";
  testo += "Varianza: " + risWelford.varianza.toFixed(8) + " &larr; risultato corretto<br>";

  document.getElementById("patologica").innerHTML = testo;
}