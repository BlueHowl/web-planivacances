import { verifyToken } from "./service/AuthService";
import { createAuthInstance } from "./service/ApiClient";
//import { writable } from 'svelte/store';

//const token = writable("null");

export let storedToken : string;

const tempToken = localStorage.getItem("Token");
if(tempToken != null && await verifyToken(tempToken)) {
    storedToken = tempToken;
    createAuthInstance(tempToken);
}

//stocke un token valide

export function setToken(token: string) {
    localStorage.setItem('Token', token);
    storedToken = token;
    createAuthInstance(token);
}

/*export function getToken() { ou acces direct?
    return storedToken;
}*/