import { instance, createAuthInstance} from "./ApiClient";
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    TwitterAuthProvider,
    signInWithPopup, 
    signInWithCustomToken 
} from "firebase/auth";
import { firebaseConfig } from "../utils/config";
import { setCustomToken, getCustomToken } from "../AuthToken";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.useDeviceLanguage();


getCustomToken().then((customToken: string|null) => {
    if(customToken) {
        authenticate(customToken);
    }
});

export async function verifyToken(token: string): Promise<boolean> {
    createAuthInstance(token);

    try {
        const response = await instance.post<string>("/auth/token");
        const result: boolean = JSON.parse(response.data);

        console.log(result ? "Token valide" : "Token invalide");

        return result
    } catch (error) {
        console.error(error);

        return false;
    }
}

export async function authenticate(customToken: string): Promise<boolean> {
    if (customToken != null) {
        const credentials = await signInWithCustomToken(auth, customToken)
        const token = await credentials.user.getIdToken(false);

        console.log("Authentification réussie");
        setCustomToken(customToken);
        createAuthInstance(token);

        return true;
    } else {
        console.error("Erreur lors de l'authentification'");

        return false;
    }
}

export async function login(email: string, password: string): Promise<boolean> {
    try {
        const response = await instance.post<string>("/auth/login", {
            mail: email,
            password: password
        });

        const customToken: string = response.data;

        const result = await authenticate(customToken);

        console.log(result ? "Connexion au compte avec succès" : "Erreur lors de la connexion au compte");

        return result

    } catch (error) {
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

        const customToken: string = response.data;

        const result = await authenticate(customToken)

        console.log(result ? "Création du compte avec succès" : "Erreur lors de la création du compte")

        return result
    } catch (error) {
        console.error(error);

        return false;
    }
}

export const signInWithGoogle = async (provider: string) => {
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const twitterProvider = new TwitterAuthProvider();
    try {
        const authProvider = (provider == "google" ? googleProvider : (provider == "facebook" ? facebookProvider : twitterProvider));

        authProvider.setCustomParameters({
            'lang': auth.languageCode!
        });

        const result = await signInWithPopup(auth, authProvider);
        const token = await result.user.getIdToken(false);

        if(await verifyToken(token)) {
            createAuthInstance(token);
            return true;
        }
    } catch (error) {
      console.error(error);

      return false;
    }
};

export function getUid() {
    return auth.currentUser?.uid;
}