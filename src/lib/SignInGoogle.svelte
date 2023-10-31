<script lang="ts">
  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { Button } from "sveltestrap";
  import googleLogo from "../assets/logo-google.png";

  // Configuration Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDEed69NWze9I39twdSl8a8SvZAOvO51QU",
    authDomain: "planivacances.firebaseapp.com",
    projectId: "planivacances",
    storageBucket: "planivacances.appspot.com",
    messagingSenderId: "389100630019",
    appId: "1:389100630019:web:11cfe216ccc49552511e36",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Envoie du token à votre API
      const apiUrl = "http://localhost:8080/api/auth/verify";
      const response = await fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`, // Envoie le token dans l'en-tête Authorization
          "Content-Type": "application/json", // Spécifier le type de contenu si nécessaire
        },
      });

      if (response.ok) {
        console.log("Token envoyé avec succès à votre API");
        const uid = await response.text();
        console.log(uid);
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
  ><img src={googleLogo} alt="Logo Google" />Continuer avec Google</Button
>

<style>
  img {
    margin-right: 2px;
  }
</style>
