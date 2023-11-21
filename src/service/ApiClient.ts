import redaxios from "redaxios";

export let instance = redaxios.create({
    baseURL: 'http://localhost:8080/api'
});

export function createAuthInstance(authToken : string) {
    instance = redaxios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    });
}

export let weatherInstance = redaxios.create({
    baseURL: `https://api.weatherapi.com/v1`
});