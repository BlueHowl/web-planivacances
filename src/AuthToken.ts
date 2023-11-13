import { verifyToken } from "./service/AuthService";
import { createAuthInstance } from "./service/ApiClient";

export let storedToken : string;

const tempToken = localStorage.getItem("Token");

const checkToken = async () => {
    if(tempToken != null && await verifyToken(tempToken)) {
        storedToken = tempToken;
        createAuthInstance(tempToken);
    }
};

checkToken();

//stocke un token valide

export function setToken(token: string) {
    localStorage.setItem('Token', token);
    storedToken = token;
    createAuthInstance(token);
}

/*export function getToken() { ou acces direct?
    return storedToken;
}*/