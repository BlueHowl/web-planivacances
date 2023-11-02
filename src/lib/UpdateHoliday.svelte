<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import { Form, FormGroup, Input, Button } from "sveltestrap";

  const location = useLocation();

  let definedHoliday = false;
  let title: string;
  let startDate: string;
  let endDate: string;
  let place: string;
  let description: string;
  let selectedIdPlace: number;

  let addresses = [
    { id: 1, completeAddress: "Rue des Pottiers 3 à 2344 LoveCity" },
    { id: 2, completeAddress: "Rue des Montagnes 44 à 2223 MontagneCity" },
  ];

  if (location && $location.state) {
    definedHoliday = true;
    const state = $location.state;
    title = state.title;
    startDate = state.startDate;
    endDate = state.endDate;
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
</script>

<h1>Modification d'une période de vacances</h1>
<section id="updateHolidayForm">
  {#if definedHoliday}
    <Form>
      <FormGroup floating label="Titre des vacances">
        <Input id="holidayTitle" name="holidayTitle" bind:value={title} />
      </FormGroup>
      <FormGroup floating label="Date de début">
        <Input
          id="startHolidayDate"
          type="date"
          name="startHolidayDate"
          style="margin-right:0.2rem;"
          bind:value={startDate}
        />
      </FormGroup>
      <FormGroup floating label="Date de fin">
        <Input
          id="endHolidayDate"
          type="date"
          name="endHolidayDate"
          style="margin-right:0.2rem;"
          bind:value={endDate}
        />
      </FormGroup>
      <FormGroup floating label="Lieu">
        <Input
          type="select"
          name="holidayPlace"
          id="holidayPlace"
          bind:value={selectedIdPlace}
        >
          {#each addresses as address}
            <option value={address.id}>{address.completeAddress}</option>
          {/each}
        </Input>
      </FormGroup>
      <FormGroup floating label="Ecrivez une description ici...">
        <Input
          id="holidayDescription"
          type="textarea"
          name="holidayDescription"
          bind:value={description}
        />
      </FormGroup>
      <Button color="primary" class="w-75 mb-3 mt-3">Modifier</Button>
    </Form>
  {:else}
    <h1>Modification de la période de vacances impossible</h1>
  {/if}
</section>

<style>
  #updateHolidayForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
