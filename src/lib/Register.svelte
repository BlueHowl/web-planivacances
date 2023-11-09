<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import { Form, FormGroup, Input, Button } from "sveltestrap";
  import { Link } from "svelte-navigator";
  import SignInGoogle from "./SignInGoogle.svelte";
  import InputPasswordWithToggle from "./InputPasswordWithToggle.svelte";

  let validated: boolean = false;

  const navigate = useNavigate();

  function onSubmit(e: any) {
    e.preventDefault();

    validated = true;

    const formData = new FormData(e.target);

    register(
      formData.get("name") as string, 
      formData.get("surname") as string, 
      formData.get("email") as string, 
      formData.get("password") as string);
  }

  const register = async (name: string, surname: string, email: string, password: string) => {
    // Envoie de l'enregistrement utilisateur à l'API
    const apiUrl = "http://localhost:8080/api/auth/register";
    const response = await fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
        username: `${surname} ${name}`,
        mail: email,
        password: password 
      })
    });

    if (response.ok) {
      console.log("Création du compte avec succès");
      const token = await response.text();
      console.log(token);

      //TODO stocker token, remonter via event dans composant parent ??
      navigate("/");
    } else {
      console.error("Erreur lors de la création du compte");
    }
  }

</script>

<h1>Création d'un compte</h1>
<section id="registerForm">
  <Form action="POST" {validated} on:submit={onSubmit}>
    <FormGroup floating label="Nom">
      <Input 
        name="name"
        placeholder="Nom"
        feedback="Nom requis"
        required />
    </FormGroup>
    <FormGroup floating label="Prénom">
      <Input 
        name="surname"
        placeholder="Prénom"
        feedback="Prénom requis"
        required />
    </FormGroup>
    <FormGroup floating label="Mail">
      <Input 
        type="email" 
        name="email"
        placeholder="Email"
        feedback="Addresse mail requise"
        required />
    </FormGroup>
    <InputPasswordWithToggle/>
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
