<script lang="ts">
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  let isConnected: Boolean = true;
  let userMail = "maxime123.cao@gmail.com";
</script>

<h1>Contacter l'administrateur</h1>
<section id="contactForm">
  <Form>
    <FormGroup floating label="Votre email">
      {#if isConnected}
        <Input type="email" name="email" value={userMail} disabled />
      {:else}
        <Input type="email" name="email" />
      {/if}
    </FormGroup>
    <FormGroup floating label="Sujet">
      <Input id="subject" name="subject" />
    </FormGroup>
    <FormGroup floating label="Ecrivez votre message ici...">
      <Input type="textarea" name="message" />
    </FormGroup>
    <Button color="primary" class="w-75">Envoyer</Button>
  </Form>
</section>

<style>
  #contactForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
