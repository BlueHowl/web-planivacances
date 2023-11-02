<script lang="ts">
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  import { Link } from "svelte-navigator";
  import SignInGoogle from "./SignInGoogle.svelte";
  import InputPasswordWithToggle from "./InputPasswordWithToggle.svelte";
</script>

<h1>Création d'un compte</h1>
<section id="registerForm">
  <Form>
    <FormGroup floating label="Nom">
      <Input name="name" />
    </FormGroup>
    <FormGroup floating label="Prénom">
      <Input name="firstname" />
    </FormGroup>
    <FormGroup floating label="Mail">
      <Input type="email" name="email" />
    </FormGroup>
    <InputPasswordWithToggle />
    <Link to="/connection" class="primary">Vous avez déjà un compte ?</Link>
    <Button color="primary" class="w-75 mb-3 mt-3">Créer un compte</Button>
    <SignInGoogle />
  </Form>
</section>

<style>
  #registerForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
