<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  import { Link } from "svelte-navigator";
  import { login } from "../service/AuthService";
  import SignInGoogle from "./SignInGoogle.svelte";
  import InputPasswordWithToggle from "./InputPasswordWithToggle.svelte";

  let validated: boolean = false;
  let isNewAccount: boolean = false;

  const navigate = useNavigate();

  function onSubmit(e: any) {
    e.preventDefault();

    validated = true;

    const formData = new FormData(e.target);

    login(
      formData.get("email") as string,
      formData.get("password") as string
    ).then((result) => {
      if (result) {
        navigate("/");
      }
    });
  }
</script>

<h1>Connexion</h1>
<section id="connectionForm">
  <Form {validated} on:submit={onSubmit}>
    <FormGroup floating label="Mail">
      <Input type="email" name="email" />
    </FormGroup>
    <InputPasswordWithToggle />
    <Link to="/register" class="primary">Pas encore de compte ?</Link>
    <Button color="primary" class="w-75 mb-3 mt-3">Connexion</Button>
    <SignInGoogle {isNewAccount} />
  </Form>
</section>

<style>
  #connectionForm {
    margin: 2rem auto;
    width: 35rem;
  }
</style>
