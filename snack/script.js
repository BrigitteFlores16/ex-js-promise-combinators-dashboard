//Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare utilizzare l'url base:https://boolean-spec-frontend.vercel.app/freetestapi
//al posto di:https://freetestapi.com/api/v1
//Ad esempio:
//https://boolean-spec-frontend.vercel.app/freetestapi/users per chiamare l'endpoint /users
//In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
//Nome completo della città e paese da  /destinations?search=[query]
//(result.name, result.country, nelle nuove proprietà city e country).
//Il meteo attuale da /weathers?search={query}
//(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
//Il nome dell’aeroporto principale da /airports?search={query}
//(result.name nella nuova proprietà airport).
//Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
//Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
//Note del docente.
//Scrivi la funzione getDashboardData(query), che deve:
//Essere asincrona (async).
//Utilizzare Promise.all() per eseguire più richieste in parallelo.
//Restituire una Promise che risolve un oggetto contenente i dati aggregati.
//Stampare i dati in console in un messaggio ben formattato.
//Testa la funzione con la query "london".

async function fetchjson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}
async function getDashboardData(query) {
  try {
    console.log(`Caricando i dati per ${query}`);
    const destinationPromise = fetchjson(
      `https://www.freetestapi.com/api/v1/destinations?search=${query}`
    );
    const weatherPromise = fetchjson(
      `https://www.freetestapi.com/api/v1/weathers?search=${query}`
    );
    const airportPromise = fetchjson(
      `https://www.freetestapi.com/api/v1/airports?search=${query}`
    );
    const promises = [destinationPromise, weatherPromise, airportPromise];
    const [destinations, weather, airport] = await Promise.all(promises);

    console.log([destinations, weather, airport]);

    return {
      city: destinations[0].name,
      country: destinations[0].country,
      temperature: weather[0].temperature,
      weather: weather[0].weather_description,
      airport: airport[0].name,
    };
  } catch (error) {
    throw new Error(`Errore: ${error.message}`);
  }
}

getDashboardData("london")
  .then((data) => {
    console.log("data:", data);
    console.log(
      ` ${data.city} is in  ${data.country}.\n` +
        `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
        `The main airport is ${data.airport}.\n`
    );
  })
  .catch((error) => console.log(error));
