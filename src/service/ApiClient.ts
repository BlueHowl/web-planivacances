import redaxios from "redaxios";

export let instance = redaxios.create({
    baseURL: 'https://studapps.cg.helmo.be:5011/REST_CAO_BART/api'
});

export function createAuthInstance(authToken : string) {
    instance = redaxios.create({
        baseURL: 'https://studapps.cg.helmo.be:5011/REST_CAO_BART/api',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    });
}

export let weatherInstance = redaxios.create({
    baseURL: `https://api.weatherapi.com/v1`
});