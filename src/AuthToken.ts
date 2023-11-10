import { writable } from 'svelte/store';

//const token = writable("null");

let storedToken = localStorage.getItem("Token");

//stocke un token valide
export function setToken(token: string) {
    localStorage.setItem('Token', token);
    storedToken = token;
}

export function getToken() {
    return storedToken;
}

