<script lang="ts">
  import { signInWithGoogle } from "../service/AuthService";
  import { Button } from "sveltestrap";
  import xLogo from "../assets/logo-x.png";
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
      const result = await signInWithGoogle("xtwitter");

      if (result) {
        console.log('Authentication X réussie');

        if(isNewAccount) {
          onAddUser();
        }

        navigate("/");
      } else {
        console.log('Problème Authentication X');
      }
    } catch (error) {
      console.error('Erreur durant la connexion x:', error);
    }
  };
</script>

<Button
  class="w-75 m-auto"
  style="display:flex;justify-content:center;align-items:center;margin-bottom:0.5rem !important;"
  color="light"
  type="button"
  on:click={handleSignIn}
  ><img src={xLogo} alt="Logo X" />Continuer avec X</Button>

<style>
  img {
    margin-right: 2px;
    width: 20px;
    height: 20px;
  }
</style>
