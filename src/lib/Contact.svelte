<script lang="ts">
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  let isConnected: Boolean = false;
  let userMail = "maxime123.cao@gmail.com";
</script>

<section id="contactForm">
  <Form>
    <FormGroup>
      {#if isConnected}
        <Input type="email" name="email" value={userMail} disabled />
      {:else}
        <Input type="email" name="email" placeholder="Votre email" />
      {/if}
    </FormGroup>
    <FormGroup>
      <Input id="subject" name="subject" placeholder="Sujet" />
    </FormGroup>
    <FormGroup>
      <Input
        type="textarea"
        name="message"
        placeholder="Ecrivez votre message ici..."
      />
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
