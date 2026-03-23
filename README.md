# uniform-to-distributions-demo

Homework di Statistica Applicata — Debora Siri, matricola 1921846

## Descrizione

Demo interattiva che genera numeri pseudocasuali a partire da una variabile uniforme U[0,1) e li trasforma nelle principali distribuzioni statistiche. Per ogni distribuzione vengono mostrati i due istogrammi (input e output) e calcolate media e varianza con la ricorrenza di Welford.

## Distribuzioni implementate

- **Esponenziale** — inversione CDF: `X = -log(U) / λ`
- **Normale** — metodo di Box-Muller
- **Chi-quadro (2gl)** — caso speciale: `X = -2·log(U)`
- **Weibull** — inversione CDF: `X = (-log(U)/λ)^(1/α)`

## File

- `demo.html` — interfaccia
- `demo.js` — logica di generazione e calcolo

## Come si usa

**Online** — visitare direttamente:
https://deborasiri.github.io/uniform-to-distributions-demo/

**In locale** — scaricare i file `demo.html` e `demo.js` nella stessa cartella e aprire `demo.html` nel browser.

Scegliere la distribuzione, impostare n e cliccare Genera.
