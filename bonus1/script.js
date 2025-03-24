// Bonus 1 - Risultato vuoto
//Se l'array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata.
// Testa la funzione con la query "vienna" (non trova il meteo).

const Url = "https://boolean-spec-frontend.vercel.app/freetestapi";

const getDashboardData = async (query) => {
  const destinationsUrl = `${Url}/destinations?search=${query}`;
  const weatherUrl = `${Url}/weathers?search=${query}`;
  const airportUrl = `${Url}/airports?search=${query}`;

  const [destinations, weather, airport] = await Promise.all([
    fetch(destinationsUrl).then((res) => res.json()),
    fetch(weatherUrl).then((res) => res.json()),
    fetch(airportUrl).then((res) => res.json()),
  ]);

  const dashboardData = {
    city: destinations[0]?.name || null,
    country: destinations[0]?.country || null,
    temperature: weather[0]?.temperature || null,
    weather: weather[0]?.weather_description || null,
    airport: airport[0]?.name || null,
  };

  Object.entries(dashboardData).forEach(([key, value]) => {
    if (value !== null) {
      console.log(`${key}: ${value}`);
    }
  });

  return dashboardData;
};

(async () => {
  const data = await getDashboardData("vienna");
  console.log("Dati completi:", data);
})();
