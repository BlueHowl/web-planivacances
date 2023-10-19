<script lang="ts">
    import { initializeApp } from 'firebase/app';
    import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  
    // Configuration Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyDEed69NWze9I39twdSl8a8SvZAOvO51QU",
      authDomain: "planivacances.firebaseapp.com",
      projectId: "planivacances",
      storageBucket: "planivacances.appspot.com",
      messagingSenderId: "389100630019",
      appId: "1:389100630019:web:11cfe216ccc49552511e36"
    };
  
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
  
    // Fonction de connexion avec Google
    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      
      try {
        const result = await signInWithPopup(auth, provider);
        // Vous pouvez maintenant envoyer le jeton d'authentification à votre API Spring Boot.
        const token = await result.user.getIdToken();
        
        // Envoie du token à votre API
        const apiUrl = 'http://localhost:8080/api/auth/verify'; // Remplacez par l'URL de votre API
        const response = await fetch(apiUrl, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Authorization': `Bearer ${token}`, // Envoie le token dans l'en-tête Authorization
            'Content-Type': 'application/json', // Spécifiez le type de contenu si nécessaire
          }
        });

        if (response.ok) {
          // La requête a réussi
          console.log('Token envoyé avec succès à votre API');
          const uid = await response.text();
          console.log(uid);
        } else {
          // Gérez les erreurs ici
          console.error('Erreur lors de l\'envoi du token à votre API');
        }

      } catch (error) {
        console.error(error);
      }
    };
  </script>
  
  <main>
    <h3>Authentification avec Google</h3>
    <button on:click={signInWithGoogle}>Se connecter avec Google</button>
  </main>
  
  <style>
    /* Vos styles CSS ici */
  </style>