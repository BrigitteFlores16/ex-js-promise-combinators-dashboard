// Bonus 2 - Chiamate fallite
//Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.
//Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:
//Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
//Stampa in console un messaggio di errore per ogni richiesta fallita.
//Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).
