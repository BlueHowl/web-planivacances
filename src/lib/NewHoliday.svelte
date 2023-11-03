<script lang="ts">
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  let addresses = [
    { id: 1, completeAddress: "Rue des Pottiers 3 2344 LoveCity" },
    { id: 2, completeAddress: "Rue de Harlez 25 4000 Liège" },
  ];
</script>

<h1>Ajout d'une période de vacances</h1>
<section id="addHolidayForm">
  <Form>
    <FormGroup floating label="Titre des vacances">
      <Input id="holidayTitle" name="holidayTitle" />
    </FormGroup>
    <FormGroup floating label="Date de début">
      <Input
        id="startHolidayDate"
        type="date"
        name="startHolidayDate"
        style="margin-right:0.2rem;"
      />
    </FormGroup>
    <FormGroup floating label="Date de fin">
      <Input
        id="endHolidayDate"
        type="date"
        name="endHolidayDate"
        style="margin-right:0.2rem;"
      />
    </FormGroup>
    <FormGroup floating label="Lieu">
      <Input type="select" name="holidayPlace" id="holidayPlace">
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
      />
    </FormGroup>
    <Button color="primary" class="w-75 mb-3 mt-3">Ajouter</Button>
  </Form>
</section>

<style>
  #addHolidayForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
