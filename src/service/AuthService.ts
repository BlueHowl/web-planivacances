import { instance, createAuthInstance} from "./ApiClient";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setToken } from "../AuthToken";

// Configuration Firebase TODO TODOOOOOO Déplacer dans un autre fichier
const firebaseConfig = {
    apiKey: "AIzaSyDEed69NWze9I39twdSl8a8SvZAOvO51QU",
    authDomain: "planivacances.firebaseapp.com",
    databaseURL: "https://planivacances-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "planivacances",
    storageBucket: "planivacances.appspot.com",
    messagingSenderId: "389100630019",
    appId: "1:389100630019:web:11cfe216ccc49552511e36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function verifyToken(token: string): Promise<boolean> {
    createAuthInstance(token);

    try {
        const response = await instance.post<string>("/auth/token");
        const tkn: string = response.data;

        if (tkn != null) {
            console.log("Token valide");
            return true;
        } else {
            console.error("Token invalide");
            return false;
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        return false;
    }
}

export async function login(email: string, password: string): Promise<boolean> {
    try {
        const response = await instance.post<string>("/auth/login", {
            mail: email,
            password: password
        });

        const tkn: string = response.data;

        if (tkn != null && await verifyToken(tkn)) {
            console.log("Connexion au compte avec succès");
            setToken(tkn);
            return true;
        } else {
            console.error("Erreur lors de la connexion au compte");
            return false;
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        return false;
    }
}

export async function register(name: string, surname: string, email: string, password: string): Promise<boolean> {
    try {
        const response = await instance.post<string>("/auth/register", {
            username: `${surname} ${name}`,
            mail: email,
            password: password
        });

        const tkn: string = response.data;

        if (tkn != null && await verifyToken(tkn)) {
            console.log("Création du compte avec succès");
            setToken(tkn);
            return true;
        } else {
            console.error("Erreur lors de la création du compte");
            return false;
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        return false;
    }
}


export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      if(await verifyToken(token)) {
        setToken(token);
        //navigate("/");
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
};