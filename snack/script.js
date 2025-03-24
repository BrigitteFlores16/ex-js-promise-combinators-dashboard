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
const getDashboardData = async (query) => {
  const Url = "https://boolean-spec-frontend.vercel.app/freetestapi";

  const urls = {
    destinations: `${Url}/destinations?search=${query}`,
    weather: `${Url}/weathers?search=${query}`,
    airport: `${Url}/airports?search=${query}`,
  };

  try {
    const [destinations, weather, airport] = await Promise.all([
      fetch(urls.destinations).then((res) => res.json()),
      fetch(urls.weather).then((res) => res.json()),
      fetch(urls.airport).then((res) => res.json()),
    ]);

    const dashboardData = {
      city: destinations[0]?.name ?? "N/A",
      country: destinations[0]?.country ?? "N/A",
      temperature: weather[0]?.temperature ?? "N/A",
      weather: weather[0]?.weather_description ?? "N/A",
      airport: airport[0]?.name ?? "N/A",
    };

    console.log("Dashboard data for", query.toUpperCase());
    console.table(dashboardData);

    return dashboardData;
  } catch (error) {
    console.error(`Error fetching ${query}:`, error);
    throw error;
  }
};

(async () => {
  const data = await getDashboardData("london");
})();
