<script lang="ts">
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  import { Link } from "svelte-navigator";
  import SignInGoogle from "./SignInGoogle.svelte";
  import InputPasswordWithToggle from "./InputPasswordWithToggle.svelte";
</script>

<h1>Connexion</h1>
<section id="connectionForm">
  <Form>
    <FormGroup floating label="Mail">
      <Input type="email" name="email" />
    </FormGroup>
    <InputPasswordWithToggle />
    <Link to="/register" class="primary">Pas encore de compte ?</Link>
    <Button color="primary" class="w-75 mb-3 mt-3">Connexion</Button>
    <SignInGoogle />
  </Form>
</section>

<style>
  #connectionForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
