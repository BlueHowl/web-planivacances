import redaxios from "redaxios";
//import RedaxiosInstance from "redaxios";

/*export const authInstance = redaxios.create({
    baseURL: 'https://localhost:8080/api/auth/'
});*/

export let instance = redaxios.create({
    baseURL: 'http://localhost:8080/api'
});

export function createAuthInstance(authToken : string) {
    instance = redaxios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Authorization': JSON.stringify(`Bearer ${authToken}`),
            'Content-Type': 'application/json'
        }
    });
}