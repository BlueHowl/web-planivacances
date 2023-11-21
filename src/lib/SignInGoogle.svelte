<script lang="ts">
  import { signInWithOtherProvider } from "../service/AuthService";
  import { Button } from "sveltestrap";
  import googleLogo from "../assets/logo-google.png";
  import { useNavigate } from "svelte-navigator";

  export let isNewAccount: boolean;

  const navigate = useNavigate();

  const onAddUser = async () => {
    try {
      await fetch(
        "https://studapps.cg.helmo.be:5011/REST_CAO_BART/api/users/number"
      );
    } catch (error: any) {
      console.log("Erreur lors de la mise à jour du nombre d'utilisateurs");
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signInWithOtherProvider("google");

      if (result) {
        console.log("Authentication Google réussie");

        if (isNewAccount) {
          onAddUser();
        }

        navigate("/");
      } else {
        console.log("Problème Authentication Google");
      }
    } catch (error) {
      console.error("Erreur durant la connexion google:", error);
    }
  };
</script>

<Button
  class="w-75 m-auto"
  style="display:flex;justify-content:center;align-items:center;margin-bottom:0.5rem !important;"
  color="light"
  type="button"
  on:click={handleSignIn}
  ><img src={googleLogo} alt="Logo Google" />Continuer avec Google</Button
>

<style>
  img {
    margin-right: 2px;
  }
</style>
