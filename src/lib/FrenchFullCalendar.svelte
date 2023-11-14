<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import { Button } from "sveltestrap";
  import { exportCalendar } from "../service/CalendarService";}

  let calendar: Calendar;
  let dispatch = createEventDispatcher();

  export function addEventToCalendar(
    title: string,
    startDate: string,
    endDate: string,
    place: string,
    description: string
  ) {
    if (calendar) {
      calendar.addEvent({
        title: title,
        start: startDate,
        end: endDate,
        place: place,
        description: description,
      });
    }
  }

  onMount(() => {
    calendar = new Calendar(document.getElementById("calendar"), {
      plugins: [dayGridPlugin],
      initialView: "dayGridMonth",
      locale: "frLocale",
      buttonText: {
        today: "Aujourd'hui",
      },
      eventClick: function (info) {
        const activity = info.event;
        dispatch("navToDetails", {
          title: activity.title,
          startDate: activity.start ? activity.start.toLocaleString() : "",
          endDate: activity.end ? activity.end.toLocaleString() : "",
          place: activity.extendedProps.place,
          description: activity.extendedProps.description,
        });
      },
    });

    calendar.render();
  });
</script>

<div id="calendar" />

<Button on:click={exportCalendar}>Exporter</Button>
