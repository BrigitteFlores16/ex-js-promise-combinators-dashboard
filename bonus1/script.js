// Bonus 1 - Risultato vuoto
//Se l'array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata.
// Testa la funzione con la query "vienna" (non trova il meteo).

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}
async function getDashboardData(query) {
  try {
    console.log(`Caricando i dati per ${query}`);

    const destinationPromise = fetchJson(
      `https://www.freetestapi.com/api/v1/destinations?search=${query}`
    );
    const weatherPromise = fetchJson(
      `https://www.freetestapi.com/api/v1/weathers?search=${query}`
    );
    const airportPromise = fetchJson(
      `https://www.freetestapi.com/api/v1/airports?search=${query}`
    );
    const promises = [destinationPromise, weatherPromise, airportPromise];
    const [destinations, weathers, airports] = await Promise.all(promises);

    const destination = destinations[0];
    const weather = weathers[0];
    const airport = airports[0];

    return {
      city: destination ? destination.name : null,
      country: destination ? destination.country : null,
      temperature: weather ? weather.temperature : null,
      weather: weather ? weather.weather_description : null,
      airport: airport ? airport.name : null,
    };
  } catch (error) {
    throw new Error(`Errore: ${error.message}`);
  }
}
getDashboardData("vienna")
  .then((data) => {
    console.log("Dashboard data:", data);
    console.log(
      `${data.city} is in ${data.country}.\n` +
        `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
        `The main airport is ${data.airport}.\n`
    );
  })
  .catch((error) => console.error(error));
