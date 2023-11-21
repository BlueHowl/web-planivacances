import type { CountryUserMap } from "../model/CountryUserMap";
import { userPerCountryStore } from "../stores/statByCountry";
import { instance } from "./ApiClient";

export async function getUsersPerCountry(givenDate:string) {
    try {
        const response = await instance.get<string>(`/users/country/${givenDate}`);

        if(response.status == 200) {
            const statList = response.data as unknown as CountryUserMap;

            userPerCountryStore.set(statList);
            
            console.log("Statistiques chargés");
            
        }
    } catch (error) {
        console.error(error);
    }
}