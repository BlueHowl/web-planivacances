<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { authToken } from "../token";
  import { Button } from "sveltestrap";
  import googleLogo from "../assets/logo-google.png";

  // Configuration Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDEed69NWze9I39twdSl8a8SvZAOvO51QU",
    authDomain: "planivacances.firebaseapp.com",
    databaseURL: "https://planivacances-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "planivacances",
    storageBucket: "planivacances.appspot.com",
    messagingSenderId: "389100630019",
    appId: "1:389100630019:web:11cfe216ccc49552511e36"
  };

  const navigate = useNavigate();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Envoie du token à l'API
      const apiUrl = "http://localhost:8080/api/auth/token";
      const response = await fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`, // Envoie le token dans l'en-tête Authorization
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        console.log("Token envoyé avec succès à votre API");
        const token = await response.text();

        if(token) {
          authToken.set(token); // remonter via event dans composant parent ??
          navigate("/");
        } else {
          console.error("Erreur lors de la récupération du token");
        }
      } else {
        console.error("Erreur lors de l'envoi du token à votre API");
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>

<Button
  class="w-75 m-auto"
  style="display:flex;justify-content:center;align-items:center;"
  color="light"
  on:click={signInWithGoogle}
  ><img src={googleLogo} alt="Logo Google" />Continuer avec Google</Button>

<style>
  img {
    margin-right: 2px;
  }
</style>
