<script lang="ts">
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  import { Link } from "svelte-navigator";
  import SignInGoogle from "./SignInGoogle.svelte";
  import InputPasswordWithToggle from "./InputPasswordWithToggle.svelte";
</script>

<section id="registerForm">
  <Form>
    <FormGroup>
      <Input name="name" placeholder="Nom" />
    </FormGroup>
    <FormGroup>
      <Input name="firstname" placeholder="Prénom" />
    </FormGroup>
    <FormGroup>
      <Input type="email" name="email" placeholder="Mail" />
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
