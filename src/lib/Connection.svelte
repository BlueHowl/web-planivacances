<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  import { Link } from "svelte-navigator";
  import { setToken } from "../AuthToken";
  import SignInGoogle from "./SignInGoogle.svelte";
  import InputPasswordWithToggle from "./InputPasswordWithToggle.svelte";

  let validated: boolean = false;
  let isNewAccount: boolean = false;

  const navigate = useNavigate();

  function onSubmit(e: any) {
    e.preventDefault();

    validated = true;

    const formData = new FormData(e.target);

    login(formData.get("email") as string, formData.get("password") as string);
  }

  const login = async (email: string, password: string) => {
    // Envoie de l'enregistrement utilisateur à l'API
    const apiUrl = "http://localhost:8080/api/auth/login";
    const response = await fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: email,
        password: password,
      }),
    });

    if (response.ok) {
      console.log("Connexion au compte avec succès");
      const token = await response.text();

      if (token) {
        setToken(token); // remonter via event dans composant parent ??
        navigate("/");
      } else {
        console.error("Erreur lors de la récupération du token");
      }
    } else {
      console.error("Erreur lors de la connexion au compte");
    }
  };
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
