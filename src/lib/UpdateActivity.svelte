<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import { Form, FormGroup, Input, Button } from "sveltestrap";

  const location = useLocation();

  let definedActivity = false;
  let title: string;
  let startDate: string;
  let endDate: string;
  let place: string;
  let description: string;
  let selectedIdPlace: number;

  let addresses = [
    { id: 1, completeAddress: "Rue Montagne 3 à 40003 Montagne" },
    { id: 2, completeAddress: "Rue de la Mer 5 à 50005 Mer" },
  ];

  if (location && $location.state) {
    definedActivity = true;
    const state = $location.state;
    title = state.title;
    startDate = formatDateForInput(state.startDate);
    endDate = formatDateForInput(state.endDate);
    place = state.place;
    description = state.description;
    selectedIdPlace = getIdAddress(place);
  }

  function getIdAddress(place: string) {
    let findAddressId = addresses.findIndex(
      (elem) => elem.completeAddress === place
    );
    return findAddressId != -1 ? findAddressId + 1 : 1;
  }

  function formatDateForInput(dateString: string) {
    const [datePart, timePart] = dateString.split(" ");

    const [day, month, year] = datePart.split("/");
    const [hour, minute, second] = timePart.split(":");

    return `${year}-${month}-${day}T${hour}:${minute}`;
  }
</script>

<h1>Modification d'une activité</h1>
<section id="updateActivityForm">
  {#if definedActivity}
    <Form>
      <FormGroup floating label="Titre de l'activité">
        <Input id="activityTitle" name="activityTitle" bind:value={title} />
      </FormGroup>
      <FormGroup floating label="Date de début">
        <Input
          id="startActivityDate"
          type="datetime-local"
          name="startActivityDate"
          style="margin-right:0.2rem;"
          bind:value={startDate}
        />
      </FormGroup>
      <FormGroup floating label="Date de fin">
        <Input
          id="endActivityDate"
          type="datetime-local"
          name="endActivityDate"
          style="margin-right:0.2rem;"
          bind:value={endDate}
        />
      </FormGroup>
      <FormGroup floating label="Lieu">
        <Input
          type="select"
          name="activityPlace"
          id="activityPlace"
          bind:value={selectedIdPlace}
        >
          {#each addresses as address}
            <option value={address.id}>{address.completeAddress}</option>
          {/each}
        </Input>
      </FormGroup>
      <FormGroup floating label="Ecrivez une description ici...">
        <Input
          id="activityDescription"
          type="textarea"
          name="activityDescription"
          bind:value={description}
        />
      </FormGroup>
      <Button color="primary" class="w-75 mb-3 mt-3">Modifier</Button>
    </Form>
  {:else}
    <h1>Modification de l'activité impossible</h1>
  {/if}
</section>

<style>
  #updateActivityForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
