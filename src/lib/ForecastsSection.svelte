<script lang="ts">
  import { onMount } from "svelte";
  import Forecast from "./Forecast.svelte";
  import { API_KEY_GOOGLE, API_KEY_WEATHER } from "../utils/config";

  export let place: string;
  let forecasts: any = [];
  let errorMessage: string = "";

  const getCoordinates = async (place: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          place
        )}&key=${API_KEY_GOOGLE}`
      );
      if (response.ok) {
        const coordinatesResult = await response.json();
        if (coordinatesResult.results.length > 0) {
          const lat = coordinatesResult.results[0].geometry.location.lat;
          const long = coordinatesResult.results[0].geometry.location.lng;
          return { latitude: lat, longitude: long };
        } else {
          throw new Error("Adresse non trouvée");
        }
      } else {
        throw new Error("Erreur lors de la récupération des coordonnées");
      }
    } catch (error: any) {
      errorMessage = error.message;
      return null;
    }
  };

  const getWeatherData = async (lat: number, long: number) => {
    const days = 14;
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY_WEATHER}&q=${lat},${long}&days=${days}&aqi=no&alerts=no`
      );
      if (response.ok) {
        const forecastsResult = await response.json();
        return forecastsResult?.forecast?.forecastday?.map((forecast: any) => ({
          date: forecast.date,
          imageCondition: forecast.day.condition.icon,
          tempMin: forecast.day.mintemp_c,
          tempMax: forecast.day.maxtemp_c,
          rain: forecast.day.totalprecip_mm,
          snow: forecast.day.totalsnow_cm,
          wind: forecast.day.maxwind_kph,
          humidity: forecast.day.avghumidity,
        }));
      } else {
        throw new Error(
          "Erreur lors de la récupération des données météorologiques"
        );
      }
    } catch (error: any) {
      errorMessage = error.message;
      return null;
    }
  };

  const getWeatherBasedOnAddress = async (place: string) => {
    forecasts = [];
    errorMessage = "";
    const coordinates = await getCoordinates(place);
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      forecasts = await getWeatherData(latitude, longitude);
    }
  };

  // Sur base de l'adresse, il faudra utiliser l'API qui permet d'obtenir sa longitude et latitude. Ici je mets des données en dur (Liège) :
  onMount(() => {
    getWeatherBasedOnAddress(place);
  });
</script>

{#if errorMessage.length > 0}
  <p>{errorMessage}</p>
{:else}
  <section id="forecastsSection container">
    {#each forecasts as forecast}
      <Forecast
        image={forecast.imageCondition}
        tempMin={forecast.tempMin}
        tempMax={forecast.tempMax}
        date={forecast.date}
        rain={forecast.rain}
        snow={forecast.snow}
        wind={forecast.wind}
        humidity={forecast.humidity}
      />
    {/each}
  </section>
{/if}
