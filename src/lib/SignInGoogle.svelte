<script lang="ts">
  import { signInWithGoogle } from "../service/AuthService";
  import { Button } from "sveltestrap";
  import googleLogo from "../assets/logo-google.png";
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      if (result) {
        console.log('Authentication Google réussie');

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
  on:click={handleSignIn}
  ><img src={googleLogo} alt="Logo Google" />Continuer avec Google</Button>

<style>
  img {
    margin-right: 2px;
  }
</style>
