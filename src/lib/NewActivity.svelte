<script lang="ts">
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  let addresses = [
    { id: 1, completeAddress: "Rue Montagne 3 40003 Montagne" },
    { id: 2, completeAddress: "Rue de la Mer 5 50005 Mer" },
  ];
</script>

<h1>Ajout d'une activité</h1>
<section id="addActivityForm">
  <Form>
    <FormGroup floating label="Titre de l'activité">
      <Input id="activityTitle" name="activityTitle" />
    </FormGroup>
    <FormGroup floating label="Date de début">
      <Input
        id="startActivityDate"
        type="datetime-local"
        name="startActivityDate"
        style="margin-right:0.2rem;"
      />
    </FormGroup>
    <FormGroup floating label="Date de fin">
      <Input
        id="endActivityDate"
        type="datetime-local"
        name="endActivityDate"
        style="margin-right:0.2rem;"
      />
    </FormGroup>
    <FormGroup floating label="Lieu">
      <Input type="select" name="activityPlace" id="activityPlace">
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
      />
    </FormGroup>
    <Button color="primary" class="w-75 mb-3 mt-3">Ajouter</Button>
  </Form>
</section>

<style>
  #addActivityForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
