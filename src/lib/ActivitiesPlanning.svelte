<script lang="ts">
  import { Button } from "sveltestrap";
  import { useLocation, useNavigate } from "svelte-navigator";
  import FrenchFullCalendar from "./FrenchFullCalendar.svelte";

  let navigate = useNavigate();
  let definedHoliday: boolean = false;
  let idHoliday: number;
  const location = useLocation();

  let activities: {
    title: string;
    startDate: string;
    endDate: string;
    place: string;
    description: string;
  }[] = [];

  let calendarComponent: FrenchFullCalendar;

  const addEventsToCalendar = () => {
    activities.forEach((activity) =>
      calendarComponent.addEventToCalendar(
        activity.title,
        activity.startDate,
        activity.endDate,
        activity.place,
        activity.description
      )
    );
  };

  function onNavToActivityDetails(event: CustomEvent) {
    const activity = event.detail;
    navigate("/activityDetails", {
      state: {
        title: activity.title,
        startDate: activity.startDate,
        endDate: activity.endDate,
        place: activity.place,
        description: activity.description,
      },
    });
  }

  function goToAddActivity() {
    navigate("/newActivity");
  }

  $: if (location && $location.state) {
    definedHoliday = true;
    const state = $location.state;
    idHoliday = state.id;

    // Ici on met des activités en dur mais il faudra charcher les activités correspondantes à state.id

    activities = [
      {
        title: "Ascension de la montagne",
        startDate: "2023-11-15T13:00:00",
        endDate: "2023-11-15T17:00:00",
        place: "Rue Montagne 3 à 40003 Montagne",
        description: "Pas facile tout ça",
      },
      {
        title: "Snorkeling",
        startDate: "2023-11-18T14:00:00",
        endDate: "2023-11-18T16:00:00",
        place: "Rue de la Mer 5 à 50005 Mer",
        description: "On va faire du snorkeling à la mer",
      },
    ];

    if (calendarComponent) {
      addEventsToCalendar();
    }
  }
</script>

<h1>Planning des activités</h1>

<section id="activitiesPlanning">
  <div>
    <Button color="primary" outline on:click={goToAddActivity}
      >Ajouter une activité</Button
    >
    <Button color="primary" outline>Exporter le calendrier</Button>
  </div>
  <FrenchFullCalendar
    bind:this={calendarComponent}
    on:navToDetails={onNavToActivityDetails}
  />
</section>

<style></style>
