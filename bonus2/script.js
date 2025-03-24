// Bonus 2 - Chiamate fallite
//Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.
//Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:
//Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
//Stampa in console un messaggio di errore per ogni richiesta fallita.
//Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).

const Url = "https://boolean-spec-frontend.vercel.app/freetestapi";

const getDashboardData = async (query) => {
  const destinationsUrl = `${Url}/destinations?search=${query}`;
  const weatherUrl = `https://www.meteofittizio.it`;
  const airportUrl = `${Url}/airports?search=${query}`;

  const results = await Promise.allSettled([
    fetch(destinationsUrl).then((res) => res.json()),
    fetch(weatherUrl).then((res) => res.json()),
    fetch(airportUrl).then((res) => res.json()),
  ]);

  const dashboardData = {
    city: null,
    country: null,
    temperature: null,
    weather: null,
    airport: null,
  };

  if (results[0].status === "fulfilled" && results[0].value[0]) {
    dashboardData.city = results[0].value[0].name;
    dashboardData.country = results[0].value[0].country;
  } else {
    console.error("Errore: impossibile recuperare i dati della destinazione");
  }

  if (results[1].status === "fulfilled" && results[1].value[0]) {
    dashboardData.temperature = results[1].value[0].temperature;
    dashboardData.weather = results[1].value[0].weather_description;
  } else {
    console.error("Errore: impossibile recuperare i dati meteo");
  }

  if (results[2].status === "fulfilled" && results[2].value[0]) {
    dashboardData.airport = results[2].value[0].name;
  } else {
    console.error("Errore: impossibile recuperare i dati dell'aeroporto");
  }

  console.log("Dati del dashboard:", dashboardData);
  return dashboardData;
};

(async () => {
  try {
    const data = await getDashboardData("london");
  } catch (error) {
    console.error("Errore generale:", error);
  }
})();
