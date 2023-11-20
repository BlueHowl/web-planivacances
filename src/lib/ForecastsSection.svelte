<script lang="ts">
  import { onMount } from "svelte";
  import Forecast from "./Forecast.svelte";
  import { getWeatherData } from "../service/WeatherService";
  import { groupListStore } from "../stores/group";
  import { currentGroupId } from "../stores/currentGroup";
  import type { GroupMap } from "../model/GroupMap";

  let forecasts: any = [];
  let errorMessage: string = "";

  let groups: GroupMap = $groupListStore || {};
  
  let group = groups[$currentGroupId];

  const getWeather = async () => {
    forecasts = await getWeatherData(group.place.lat, group.place.lon);
  }

 onMount(() => {
    getWeather();
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
