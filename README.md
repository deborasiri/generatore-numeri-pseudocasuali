```
# Generatore di numeri pseudocasuali

Applicazione web in JavaScript per la generazione di numeri pseudocasuali e l'analisi statistica dei dati generati.

## Funzionalità

Distribuzioni disponibili:
- Uniforme [0,1]
- Esponenziale
- Normale (Box-Muller)
- Chi-quadrato (2 gradi di libertà)
- Weibull
- Binomiale

Il programma calcola media e varianza usando la ricorrenza di Welford, più stabile numericamente rispetto alla formula classica.

È inclusa anche una sezione di confronto tra la formula naive e l'algoritmo di Welford su sequenze patologiche, per mostrare i problemi di cancellazione catastrofica.

## Struttura del progetto

- `index.html` — interfaccia utente
- `pseudocasuali.js` — logica di generazione e calcolo statistico

## Come eseguire

Apri il link GitHub Pages del progetto:
https://deborasiri.github.io/generatore-numeri-pseudocasuali

Oppure scarica i file e apri `index.html` in locale nel browser.

## Metodi utilizzati

- Metodo di inversione (esponenziale, Weibull)
- Formula di Box-Muller (normale)
- Combinazione di variabili indicatrici (binomiale)
- Ricorrenza di Welford per media e varianza

## Autore

Debora Siri
```
