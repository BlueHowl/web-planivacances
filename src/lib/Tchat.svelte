<script lang="ts">
  import { useLocation } from "svelte-navigator";

  const location = useLocation();

  let definedHoliday = false;
  let title: string;

  if (location && $location.state) {
    definedHoliday = true;
    const state = $location.state;
    title = state.title;
  }
</script>

{#if definedHoliday}
  <h1>Tchat - {title}</h1>
  <section id="tchat" />
{:else}
  <h1>Impossible de charger le tchat pour ce voyage</h1>
{/if}
