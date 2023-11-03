<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import ForecastsSection from "./ForecastsSection.svelte";

  let definedWeather: boolean = false;
  let place: string;

  const location = useLocation();

  if (location && $location.state) {
    definedWeather = true;
    const state = $location.state;
    place = state.place;
  }
</script>

{#if definedWeather}
  <h1>Météo</h1>
  <ForecastsSection {place} />
{:else}
  <h1>Pas de météo à afficher pour ce voyage</h1>
{/if}
