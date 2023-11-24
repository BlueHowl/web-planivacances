import type { Activity } from "../model/Activity";
import { activityListStore } from "../stores/activities";
import { currentGidStore } from "../stores/currentGroup";
import { instance } from "./ApiClient";

let gid: string|null;

currentGidStore.subscribe(value => {
    gid = value;
});

export async function loadActivities() {
    try {
        const response = await instance.get<string>(`/activity/${gid}`);

        if(response.status == 200) {
            activityListStore.set(response.data as unknown as Array<Activity>);
            console.log("Activitées récupérées")
        }
        
    } catch (error) {
        console.error(error);
    }
}

export async function createActivity(activity: Activity): Promise<string|null> {
    try {
        const response = await instance.post<string>(`/activity/${gid}`, activity);

        if(response.status == 200) {
            return response.data;
        }
        
    } catch (error) {
        console.error(error);
    }

    return null;
}