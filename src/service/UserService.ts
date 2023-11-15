import { instance, createAuthInstance} from "./ApiClient";

export async function getUserDetails(token:string): Promise<Boolean> {
    console.log(token);
     createAuthInstance(token);
        try {
            console.dir(instance);
        const response = await instance.post("/users");

        if(response) {
            console.log(response.data);
            return true;
        } else {
            return false;
        }
    } catch(error) {
        console.log(error);
        return false;
    }
}