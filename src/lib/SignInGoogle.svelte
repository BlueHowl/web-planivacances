<script lang="ts">
  import { signInWithGoogle } from "../service/AuthService";
  import { Button } from "sveltestrap";
  import googleLogo from "../assets/logo-google.png";
  import { useNavigate } from "svelte-navigator";

  export let isNewAccount: boolean;

  const navigate = useNavigate();

  const onAddUser = async () => {
    try {
      await fetch("http://localhost:8080/api/users/number");
    } catch (error: any) {
      console.log("Erreur lors de la mise à jour du nombre d'utilisateurs");
    }
  };


  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      if (result) {
        console.log('Authentication Google réussie');

        if(isNewAccount) {
          onAddUser();
        }

        navigate("/");
      } else {
        console.log('Problème Authentication Google');
      }
    } catch (error) {
      console.error('Erreur durant la connxion google:', error);
    }
  };
</script>

<Button
  class="w-75 m-auto"
  style="display:flex;justify-content:center;align-items:center;"
  color="light"
  type="button"
  on:click={handleSignIn}
  ><img src={googleLogo} alt="Logo Google" />Continuer avec Google</Button>

<style>
  img {
    margin-right: 2px;
  }
</style>
