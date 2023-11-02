<script lang="ts">
  import { Button } from "sveltestrap";
  import { useLocation, useNavigate } from "svelte-navigator";

  const location = useLocation();
  const navigate = useNavigate();

  let definedActivity = false;
  let title: string;
  let startDate: string;
  let endDate: string;
  let place: string;
  let description: string;

  if (location && $location.state) {
    definedActivity = true;
    const state = $location.state;
    title = state.title;
    startDate = state.startDate;
    endDate = state.endDate;
    place = state.place;
    description = state.description;
  }

  function onUpdateActivity() {
    navigate("/updateActivity", { state: $location.state });
  }
</script>

<section id="activityDetails">
  {#if definedActivity}
    <h1>{title}</h1>
    <h2>Du {startDate} au {endDate}</h2>
    <h3>{place}</h3>
    <p>{description}</p>
    <div>
      <Button color="primary" on:click={onUpdateActivity}>Modifier</Button>
      <Button color="danger">Supprimer</Button>
    </div>
  {:else}
    <h1>Activité non trouvée</h1>
  {/if}
</section>

<style>
  #activityDetails {
    width: 60%;
    margin: auto;
  }
</style>
